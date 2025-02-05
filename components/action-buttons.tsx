"use client"

import { Button } from "@/components/ui/button"
import { createAccount, syncServers, getUserStatus } from "@/app/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

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
      // 刷新页面以获取最新状态
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "操作失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {!isRegistered && (
        <Button
          onClick={() => handleAction(createAccount, "账号创建成功")}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              创建中...
            </>
          ) : (
            "创建账号"
          )}
        </Button>
      )}
      
      {isRegistered && needsSync && (
        <Button
          onClick={() => handleAction(syncServers, "服务器同步成功")}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              同步中...
            </>
          ) : (
            "同步服务器"
          )}
        </Button>
      )}
    </div>
  )
}

