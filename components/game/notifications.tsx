"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"

interface NotificationsProps {
  notifications: string[]
}

export function Notifications({ notifications }: NotificationsProps) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <Alert key={index} className="bg-green-500/90 text-white border-green-400">
          <AlertDescription>{notification}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}