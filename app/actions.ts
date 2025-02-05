"use server"

import { cookies } from "next/headers";
import { findUser, createUser, syncUserSystems, getVisibleServersCount } from "@/lib/beszel";

export async function createAccount() {
  const userCookie = cookies().get("user")?.value;
  if (!userCookie) {
    throw new Error("未登录");
  }

  const oidcUser = JSON.parse(userCookie);
  const username = oidcUser.preferred_username || oidcUser.email;
  
  // 检查用户是否已存在
  let user = await findUser(username);
  
  if (!user) {
    // 创建新用户
    user = await createUser({
      username,
      email: oidcUser.email,
      name: oidcUser.name || username,
    });
  }

  return { success: true };
}

export async function syncServers() {
  const userCookie = cookies().get("user")?.value;
  if (!userCookie) {
    throw new Error("未登录");
  }

  const oidcUser = JSON.parse(userCookie);
  const username = oidcUser.preferred_username || oidcUser.email;
  
  // 获取用户
  const user = await findUser(username);
  if (!user) {
    throw new Error("用户不存在");
  }

  // 同步服务器
  await syncUserSystems(user.id);

  return { success: true };
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
  const visibleServers = user ? await getVisibleServersCount(user.id) : 0;
  
  return {
    isRegistered: !!user,
    visibleServers,
  };
}

