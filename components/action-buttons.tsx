"use client"

import { Button } from "@/components/ui/button"
import { createAccount, syncServers } from "@/app/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, UserPlus, RefreshCw } from "lucide-react"

interface ActionButtonsProps {
  isRegistered: boolean
  needsSync: boolean
}

export function ActionButtons({ isRegistered, needsSync }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => Promise<any>, successMessage: string) => {
    setIsLoading(true);
    try {
      await action();
      toast.success(successMessage);
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {!isRegistered && (
        <Button
          onClick={() => handleAction(createAccount, "Account created successfully")}
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      )}
      
      {isRegistered && needsSync && (
        <Button
          onClick={() => handleAction(syncServers, "Systems synchronized successfully")}
          disabled={isLoading}
          variant="secondary"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Sync Systems
            </>
          )}
        </Button>
      )}
    </div>
  )
}

