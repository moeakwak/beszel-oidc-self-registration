"use client"

import { Button } from "@/components/ui/button"
import { Shield, Loader2 } from "lucide-react"
import { useState } from "react"

interface LoginButtonProps {
  title: string
}

export function LoginButton({ title }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Redirect to login
    window.location.href = "/api/login";
  };

  return (
    <Button 
      onClick={handleLogin}
      disabled={isLoading}
      className="w-full gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          {title}
        </>
      )}
    </Button>
  );
} 