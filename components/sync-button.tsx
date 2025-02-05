"use client"

import { Button } from "@/components/ui/button"
import { syncAllSystems } from "@/app/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, RefreshCw } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SyncButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    setIsLoading(true);
    try {
      await syncAllSystems();
      toast.success("All systems synchronized successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sync failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSync}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sync all users' system access</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 