import PocketBase, { RecordModel } from "pocketbase";
import { env } from "@/env";

export const pb = new PocketBase(env.BESZEL_URL);
pb.autoCancellation(false);

export async function loginSuperuser() {
  if (pb.authStore.isValid) {
    return;
  }
  // Set admin auth token
  if (!env.BESZEL_SUPERUSER_EMAIL) {
    throw new Error("BESZEL_SUPERUSER_EMAIL is not set");
  }
  if (!env.BESZEL_SUPERUSER_PASSWORD) {
    throw new Error("BESZEL_SUPERUSER_PASSWORD is not set");
  }
  pb.collection("users").authWithPassword(
    env.BESZEL_SUPERUSER_EMAIL,
    env.BESZEL_SUPERUSER_PASSWORD
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
    const result = await pb
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
  const user = await pb.collection("users").create({
    ...data,
    role,
    password,
    passwordConfirm: password,
  });
  return user;
}

export async function syncUserSystems(userId: string) {
  await loginSuperuser();
  const systems = await pb.collection("systems").getFullList();

  for (const system of systems) {
    const users: string[] = system.users || [];
    if (!users.includes(userId)) {
      await pb.collection("systems").update(system.id, {
        users: [...users, userId],
      });
    }
  }
}

export async function getVisibleServersCount(userId: string): Promise<number> {
  await loginSuperuser();
  const systems = await pb.collection("systems").getList(1, 1, {
    filter: `users ~ "${userId}"`,
  });
  return systems.totalItems;
}
