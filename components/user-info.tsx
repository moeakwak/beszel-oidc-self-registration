import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SystemInfo } from "@/lib/beszel";
import {
  Building2,
  Mail,
  User,
  UserCircle,
  Shield,
  Key,
  CircleUserRound,
  Network,
  Link as LinkIcon,
  Hash,
} from "lucide-react";
import { OidcLinkButton } from "./oidc-link-button";

interface UserInfoProps {
  name: string;
  username: string;
  email: string;
  isRegistered: boolean;
  visibleServers: number;
  systems: SystemInfo[];
  totalSystems: number;
  role?: "user" | "readonly";
  isOidcLinked?: boolean;
  userId?: string;
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
  isOidcLinked = false,
  userId,
}: UserInfoProps) {
  return (
    <Card className="backdrop-blur-sm bg-card/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleUserRound className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Your personal information and system access details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-[120px_1fr] gap-4 items-center sm:grid-cols-[140px_1fr]">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Full Name</span>
          </div>
          <div className="truncate font-medium">{name}</div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Key className="h-4 w-4" />
            <span>Username</span>
          </div>
          <div className="truncate font-medium">{username}</div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </div>
          <div className="truncate font-medium">{email}</div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserCircle className="h-4 w-4" />
            <span>Status</span>
          </div>
          <div>
            <Badge variant={isRegistered ? "default" : "secondary"}>
              {isRegistered ? "Registered" : "Not Registered"}
            </Badge>
          </div>

          {isRegistered && userId && (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>User ID</span>
              </div>
              <div className="font-mono text-sm truncate">{userId}</div>
            </>
          )}

          {isRegistered && (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <span>OIDC</span>
              </div>
              <div>
                <Badge variant={isOidcLinked ? "default" : "secondary"}>
                  {isOidcLinked ? "Linked" : "Not Linked"}
                </Badge>
              </div>
            </>
          )}

          {isRegistered && role && (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Role</span>
              </div>
              <div>
                <Badge variant={role === "user" ? "default" : "secondary"}>
                  {role === "user" ? "Regular User" : "Read-only User"}
                </Badge>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Network className="h-4 w-4" />
            <span>Systems</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Access to {visibleServers} of {totalSystems} systems
            </div>
            {systems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {systems.map((system) => (
                  <Badge
                    key={system.id}
                    variant="outline"
                    className="bg-background/50 flex items-center gap-1.5"
                  >
                    <Building2 className="h-3 w-3" />
                    {system.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {!isOidcLinked && userId && (
          <div className="mt-4">
            <OidcLinkButton userId={userId} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
