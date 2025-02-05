"use client"

import { Button } from "@/components/ui/button"
import { createAccount } from "@/app/actions"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { linkUserWithOidc } from "@/lib/oidc-link"

export function ActionButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      const result = await createAccount();
      
      if (result.needsOidcLink && result.linkConfig) {
        const { token, beszelUrl } = result.linkConfig;
        await linkUserWithOidc(beszelUrl, token);
        toast.success("Account created and OIDC linked successfully");
      } else {
        toast.success("Account created successfully");
      }
      
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCreateAccount}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : null}
      Create Account
    </Button>
  );
}

