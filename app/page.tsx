import { UserInfo } from "@/components/user-info"
import { ActionButtons } from "@/components/action-buttons"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Toaster } from "sonner"
import { cookies } from "next/headers"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { env } from "@/env"
import { getUserStatus } from "./actions"

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

  const { isRegistered, visibleServers } = await getUserStatus();

  const userData = {
    name: user.name || "未知用户",
    username: user[env.OIDC_USERNAME_CLAIM] || user.email,
    email: user.email,
    isRegistered,
    visibleServers,
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
          <UserInfo {...userData} />
          <div className="flex justify-center">
            <ActionButtons isRegistered={isRegistered} />
          </div>
        </div>
      </div>
    </>
  )
}

