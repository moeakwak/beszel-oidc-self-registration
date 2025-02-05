import { UserInfo } from "@/components/user-info"
import { ActionButtons } from "@/components/action-buttons"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Toaster } from "sonner"

// Mock user data
const userData = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  isRegistered: false,
  visibleServers: 0,
}

export default function HomePage() {
  return (
    <>
      <Toaster />
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          <UserInfo {...userData} />
          <div className="flex justify-center">
            <ActionButtons isRegistered={userData.isRegistered} />
          </div>
        </div>
      </div>
    </>
  )
}

