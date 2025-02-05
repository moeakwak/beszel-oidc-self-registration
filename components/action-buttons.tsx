"use client"

import { Button } from "@/components/ui/button"
import { createAccount } from "@/app/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, UserPlus } from "lucide-react"

interface ActionButtonsProps {
  isRegistered: boolean
}

export function ActionButtons({ isRegistered }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createAccount();
      toast.success("Account created successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isRegistered) {
    return (
      <Button
        onClick={handleCreate}
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
    );
  }

  return null;
}

