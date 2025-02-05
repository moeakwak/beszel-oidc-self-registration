"use server"

import { cookies } from "next/headers";
import { findUser, createUser, syncUserSystems, getVisibleSystems, getAllSystemsCount, syncAllUserSystems } from "@/lib/beszel";

export async function createAccount() {
  try {
    const userCookie = cookies().get("user")?.value;
    if (!userCookie) {
      throw new Error("Not logged in");
    }

    const oidcUser = JSON.parse(userCookie);
    const username = oidcUser.preferred_username || oidcUser.email;
    
    let user = await findUser(username);
    
    if (!user) {
      user = await createUser({
        username,
        email: oidcUser.email,
        name: oidcUser.name || username,
      });
    }

    return { success: true };
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
  
  return {
    isRegistered: !!user,
    systems,
    totalSystems,
    needsSync: user ? systems.length < totalSystems : false,
    role: user?.role as "user" | "readonly" | undefined,
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
    throw error instanceof Error 
      ? error 
      : new Error("Failed to sync systems");
  }
}

