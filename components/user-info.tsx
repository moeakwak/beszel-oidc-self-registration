import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SystemInfo } from "@/lib/beszel"

interface UserInfoProps {
  name: string
  username: string
  email: string
  isRegistered: boolean
  visibleServers: number
  systems: SystemInfo[]
  totalSystems: number
  role?: "user" | "readonly"
}

export function UserInfo({
  name,
  username,
  email,
  isRegistered,
  visibleServers,
  systems,
  totalSystems,
  role,
}: UserInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-[100px_1fr] gap-4 items-center sm:grid-cols-[120px_1fr]">
          <div className="text-sm text-muted-foreground">姓名</div>
          <div className="truncate">{name}</div>
          
          <div className="text-sm text-muted-foreground">用户名</div>
          <div className="truncate">{username}</div>
          
          <div className="text-sm text-muted-foreground">邮箱</div>
          <div className="truncate">{email}</div>
          
          <div className="text-sm text-muted-foreground">注册状态</div>
          <div>{isRegistered ? "已注册" : "未注册"}</div>
          
          {isRegistered && role && (
            <>
              <div className="text-sm text-muted-foreground">用户角色</div>
              <div>
                <Badge variant={role === "user" ? "default" : "secondary"}>
                  {role === "user" ? "普通用户" : "只读用户"}
                </Badge>
              </div>
            </>
          )}
          
          <div className="text-sm text-muted-foreground">可见服务器</div>
          <div className="space-y-2">
            <div>{visibleServers} / {totalSystems} 个</div>
            <div className="flex flex-wrap gap-2">
              {systems.map((system) => (
                <Badge key={system.id} variant="secondary">
                  {system.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

