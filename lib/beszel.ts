import PocketBase, { RecordModel } from "pocketbase";
import { env } from "@/env";

export const superuserClient = new PocketBase(env.BESZEL_URL);
superuserClient.autoCancellation(false);

export async function loginSuperuser() {
  if (superuserClient.authStore.isValid) {
    return;
  }
  // Set admin auth token
  if (!env.BESZEL_SUPERUSER_EMAIL) {
    throw new Error("BESZEL_SUPERUSER_EMAIL is not set");
  }
  if (!env.BESZEL_SUPERUSER_PASSWORD) {
    throw new Error("BESZEL_SUPERUSER_PASSWORD is not set");
  }
  return superuserClient
    .collection("_superusers")
    .authWithPassword(
      env.BESZEL_SUPERUSER_EMAIL,
      env.BESZEL_SUPERUSER_PASSWORD,
      {
        // This will trigger auto refresh or auto reauthentication in case
        // the token has expired or is going to expire in the next 30 minutes.
        autoRefreshThreshold: 30 * 60,
      }
    );
}

export interface BeszelUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: "user" | "readonly";
}

export async function findUser(
  identifier: string
): Promise<RecordModel | null> {
  await loginSuperuser();
  try {
    const result = await superuserClient
      .collection("users")
      .getFirstListItem(
        `username = "${identifier}" || email = "${identifier}"`
      );
    return result;
  } catch {
    return null;
  }
}

export async function createUser(data: {
  username: string;
  email: string;
  name: string;
}): Promise<RecordModel> {
  await loginSuperuser();
  const role = (env.USER_CREATION_ROLE || "readonly") as "user" | "readonly";
  const password = crypto.randomUUID();

  try {
    const args = {
      ...data,
      role,
      password,
      passwordConfirm: password,
      emailVisibility: true,
      verified: true,
    };
    console.log(args);
    const user = await superuserClient.collection("users").create(args);
    return user;
  } catch (error) {
    console.error("Create user error:", error);
    throw new Error("创建用户失败，请稍后重试");
  }
}

export async function syncUserSystems(userId: string) {
  await loginSuperuser();
  const systems = await superuserClient.collection("systems").getFullList();

  for (const system of systems) {
    const users: string[] = system.users || [];
    if (!users.includes(userId)) {
      await superuserClient.collection("systems").update(system.id, {
        users: [...users, userId],
      });
    }
  }
}

export async function getVisibleServersCount(userId: string): Promise<number> {
  await loginSuperuser();
  const systems = await superuserClient.collection("systems").getList(1, 1, {
    filter: `users ~ "${userId}"`,
  });
  return systems.totalItems;
}

export interface SystemInfo {
  id: string;
  name: string;
}

export async function getVisibleSystems(userId: string): Promise<SystemInfo[]> {
  await loginSuperuser();
  const systems = await superuserClient.collection("systems").getFullList({
    filter: `users ~ "${userId}"`,
    fields: "id,name",
  });
  return systems.map((sys) => ({
    id: sys.id,
    name: sys.name,
  }));
}

export async function getAllSystemsCount(): Promise<number> {
  await loginSuperuser();
  const systems = await superuserClient.collection("systems").getList(1, 1);
  return systems.totalItems;
}
