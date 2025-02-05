"use client"

import { Button } from "@/components/ui/button"
import { getOidcLinkConfig } from "@/app/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, Link } from "lucide-react"
import { linkUserWithOidc } from "@/lib/oidc-link"

export function OidcLinkButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLink = async () => {
    setIsLoading(true);
    try {
      const { token, beszelUrl } = await getOidcLinkConfig(userId);
      await linkUserWithOidc(beszelUrl, token);
      toast.success("OIDC account linked successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to link OIDC account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLink}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Link className="h-4 w-4 mr-2" />
      )}
      Link OIDC Account
    </Button>
  );
} 