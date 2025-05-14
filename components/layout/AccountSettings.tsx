"use client"

import * as React from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/contexts/AuthContext" // For logging out on account deletion
import { useRouter } from "next/navigation"
import { toast } from "sonner" // Import toast

export function AccountSettings() {
  const [username, setUsername] = React.useState("CurrentUser")
  const [email, setEmail] = React.useState("user@example.com")
  const [isEditingUsername, setIsEditingUsername] = React.useState(false)
  const [isEditingEmail, setIsEditingEmail] = React.useState(false)
  // For password change, ideally we'd have separate states and validation
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("")

  const { logout, user } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (user) {
      setUsername(user.name || "User");
      setEmail(user.email || "user@example.com");
    }
  }, [user]);

  const handleSaveChanges = () => {
    // Basic validation example for password change
    if (newPassword && newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword && !currentPassword) {
      toast.error("Please enter your current password to set a new one.");
      return;
    }

    // TODO: Implement actual save logic for username, email, and password
    console.log("Saving changes:", { username, email, newPassword });
    toast.success("Account settings saved successfully!")
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsEditingUsername(false);
    setIsEditingEmail(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    // After successful deletion from backend:
    logout();
    toast.success("Account deleted successfully.", { description: "You have been logged out and redirected." });
    router.push("/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account details and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Username Section */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditingUsername}
              className="flex-grow"
            />
            <Button variant="outline" onClick={() => setIsEditingUsername(!isEditingUsername)}>
              {isEditingUsername ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>

        {/* Email Section */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditingEmail}
              className="flex-grow"
            />
            <Button variant="outline" onClick={() => setIsEditingEmail(!isEditingEmail)}>
              {isEditingEmail ? "Cancel" : "Edit"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your email is used for account recovery and important notifications.
          </p>
        </div>

        <Separator />

        {/* Change Password Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4 pt-6 sm:flex-row sm:justify-between">
        <Button onClick={handleSaveChanges} className="w-full sm:w-auto">Save All Changes</Button>
        
        <Separator orientation="vertical" className="hidden sm:block h-auto" />

        {/* Danger Zone - Delete Account Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers. All your calendar
                events and settings will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className={buttonVariants({ variant: "destructive" })}>
                Yes, Delete My Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
} 