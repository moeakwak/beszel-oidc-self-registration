"use server"

export async function createAccount() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { success: true }
}

export async function syncServers() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { success: true }
}

export async function logout() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { success: true }
}

