"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react" // Icon for change avatar button

export function ProfileHeader() {
  // Placeholder data - replace with actual user data
  const user = {
    name: "Current User",
    email: "user@example.com",
    avatarUrl: undefined, // "https://github.com/shadcn.png" // Example avatar URL
    initials: "CU",
  }

  // TODO: Implement avatar change logic
  const handleChangeAvatar = () => {
    console.log("Change avatar clicked")
    // This would typically open a file picker or a modal
  }

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 mb-6">
      <div className="relative group">
        <Avatar className="size-24 text-3xl border">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={handleChangeAvatar}
          aria-label="Change profile picture"
        >
          <Camera className="size-4" />
        </Button>
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-card-foreground">{user.name}</h2>
        <p className="text-muted-foreground text-lg">{user.email}</p>
      </div>
    </div>
  )
} 