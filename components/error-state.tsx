"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCcw } from "lucide-react"

export function ErrorState({ error }: { error: string }) {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Failed to Load Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4 gap-2"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </CardContent>
    </Card>
  )
} 