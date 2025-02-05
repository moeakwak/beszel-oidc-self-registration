"use server";

import { cookies } from "next/headers";
import {
  findUser,
  createUser,
  syncUserSystems,
  getVisibleSystems,
  getAllSystemsCount,
  syncAllUserSystems,
  impersonateUserToken,
  checkOidcLink,
} from "@/lib/beszel";
import { env } from "@/env";

interface CreateAccountResult {
  success: boolean;
  needsOidcLink: boolean;
  linkConfig?: {
    token: string;
    beszelUrl: string;
  };
}

export async function createAccount(): Promise<CreateAccountResult> {
  try {
    const userCookie = cookies().get("user")?.value;
    if (!userCookie) {
      throw new Error("Not logged in");
    }

    const oidcUser = JSON.parse(userCookie);
    const username = oidcUser.preferred_username || oidcUser.email;
    
    let user = await findUser(username);
    let isNewUser = false;
    
    if (!user) {
      user = await createUser({
        username,
        email: oidcUser.email,
        name: oidcUser.name || username,
      });
      isNewUser = true;
    }

    // 如果是新用户，返回 OIDC 关联所需的配置
    if (isNewUser) {
      const { token } = await getImpersonationToken(user.id);
      return {
        success: true,
        needsOidcLink: true,
        linkConfig: {
          token,
          beszelUrl: env.BESZEL_URL,
        }
      };
    }

    return { success: true, needsOidcLink: false };
  } catch (error) {
    console.error("Create account error:", error);
    throw error instanceof Error 
      ? error 
      : new Error("Failed to create account");
  }
}

export async function logout() {
  cookies().delete("user");
  cookies().delete("oauth_state");
  return { success: true };
}

export async function getUserStatus() {
  const userCookie = cookies().get("user")?.value;
  if (!userCookie) {
    throw new Error("未登录");
  }

  const oidcUser = JSON.parse(userCookie);
  const username = oidcUser.preferred_username || oidcUser.email;

  const user = await findUser(username);
  const systems = user ? await getVisibleSystems(user.id) : [];
  const totalSystems = await getAllSystemsCount();

  const isOidcLinked = user ? await checkOidcLink(user.id) : false;

  return {
    isRegistered: !!user,
    systems,
    totalSystems,
    needsSync: user ? systems.length < totalSystems : false,
    role: user?.role as "user" | "readonly" | undefined,
    isOidcLinked,
    userId: user?.id,
  };
}

export async function syncAllSystems() {
  try {
    const userCookie = cookies().get("user")?.value;
    if (!userCookie) {
      throw new Error("Not logged in");
    }

    await syncAllUserSystems();
    return { success: true };
  } catch (error) {
    console.error("Sync all systems error:", error);
    throw error instanceof Error ? error : new Error("Failed to sync systems");
  }
}

export async function getImpersonationToken(userId: string) {
  try {
    const token = await impersonateUserToken(userId);
    return { token };
  } catch (error) {
    console.error("获取临时令牌失败:", error);
    throw error instanceof Error ? error : new Error("获取临时令牌失败");
  }
}

export async function getOidcLinkConfig(userId: string) {
  try {
    const { token } = await getImpersonationToken(userId);
    return {
      token,
      beszelUrl: env.BESZEL_URL,
    };
  } catch (error) {
    console.error("获取 OIDC 配置失败:", error);
    throw error instanceof Error ? error : new Error("获取 OIDC 配置失败");
  }
}
