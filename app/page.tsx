import { UserInfo } from "@/components/user-info"
import { ActionButtons } from "@/components/action-buttons"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Toaster } from "sonner"
import { cookies } from "next/headers"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { env } from "@/env"
import { getUserStatus } from "./actions"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { ErrorState } from "@/components/error-state"

// 加载状态组件
function LoadingState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-[100px_1fr] gap-4 items-center sm:grid-cols-[120px_1fr]">
          {Array.from({ length: 5 }).map((_, i) => (
            <React.Fragment key={i}>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function HomePage() {
  const userCookie = cookies().get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>{env.SITE_NAME}</CardTitle>
            <CardDescription>请使用您的账号登录以继续</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/api/login">
                {env.OIDC_DISPLAY_NAME} 登录
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  let userData;
  let error;

  try {
    const { isRegistered, systems, totalSystems, needsSync, role } = await getUserStatus();
    userData = {
      name: user.name || "未知用户",
      username: user[env.OIDC_USERNAME_CLAIM] || user.email,
      email: user.email,
      isRegistered,
      visibleServers: systems.length,
      totalSystems,
      systems,
      needsSync,
      role,
    };
  } catch (e) {
    error = e instanceof Error ? e.message : "未知错误";
    console.error(error);
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" asChild>
              <a href="/api/logout">
                <LogOut className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {error ? (
            <ErrorState error={error} />
          ) : !userData ? (
            <LoadingState />
          ) : (
            <>
              <UserInfo {...userData} />
              <div className="flex justify-center">
                <ActionButtons 
                  isRegistered={userData.isRegistered} 
                  needsSync={userData.needsSync}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

