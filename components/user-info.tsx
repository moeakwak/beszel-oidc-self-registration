import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserInfoProps {
  name: string
  username: string
  email: string
  isRegistered: boolean
  visibleServers: number
}

export function UserInfo({ name, username, email, isRegistered, visibleServers }: UserInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-muted-foreground">Name:</div>
          <div>{name}</div>

          <div className="text-muted-foreground">Username:</div>
          <div>{username}</div>

          <div className="text-muted-foreground">Email:</div>
          <div>{email}</div>

          <div className="text-muted-foreground">Beszel Status:</div>
          <div>{isRegistered ? "Registered" : "Not Registered"}</div>

          {isRegistered && (
            <>
              <div className="text-muted-foreground">Visible Servers:</div>
              <div>{visibleServers}</div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

