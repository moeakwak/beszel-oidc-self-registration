"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createAccount, syncServers } from "@/app/actions"
import { useRouter } from "next/navigation"

interface ActionButtonsProps {
  isRegistered: boolean
}

export function ActionButtons({ isRegistered }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateAccount = async () => {
    setIsLoading(true)
    try {
      await createAccount()
      toast.success("Account created successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncServers = async () => {
    setIsLoading(true)
    try {
      await syncServers()
      toast.success("Servers synced successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to sync servers")
    } finally {
      setIsLoading(false)
    }
  }

  if (isRegistered) {
    return (
      <Button onClick={handleSyncServers} disabled={isLoading}>
        {isLoading ? "Syncing..." : "Sync Visible Systems"}
      </Button>
    )
  }

  return (
    <Button onClick={handleCreateAccount} disabled={isLoading}>
      {isLoading ? "Creating..." : "Create Account"}
    </Button>
  )
}

