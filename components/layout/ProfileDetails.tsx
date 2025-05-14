"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function ProfileDetails() {
  // Placeholder state - replace with actual user data and edit logic
  const [isEditing, setIsEditing] = React.useState(false)
  const [displayName, setDisplayName] = React.useState("Current User")
  const [bio, setBio] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  )
  const joinedDate = "January 1, 2024" // This would typically be static or from user data

  const handleEditToggle = () => {
    if (isEditing) {
      // TODO: Save changes logic here
      console.log("Profile details saved:", { displayName, bio })
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={!isEditing}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!isEditing}
          placeholder="Tell us a little about yourself"
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Joined</h3>
        <p className="mt-1 text-card-foreground">{joinedDate}</p>
      </div>

      <Button onClick={handleEditToggle}>
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>
    </div>
  )
} 