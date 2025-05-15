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
import { useRouter } from "next/navigation"
import { toast } from "sonner" // Import toast
import { createClient } from "@/lib/supabase/client" // Import Supabase client
import type { User } from '@supabase/supabase-js' // Import Supabase User type

export function AccountSettings() {
  const supabase = createClient(); // Initialize Supabase client
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [username, setUsername] = React.useState("") // Initialize with empty string
  const [email, setEmail] = React.useState("") // Initialize with empty string
  const [isEditingUsername, setIsEditingUsername] = React.useState(false)
  const [isEditingEmail, setIsEditingEmail] = React.useState(false)
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("")

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        setUsername(session.user.user_metadata?.full_name || session.user.email || "");
        setEmail(session.user.email || "");
      }
    };
    fetchUser();

    // Listen for auth state changes to update user info if needed
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setUsername(session.user.user_metadata?.full_name || session.user.email || "");
        setEmail(session.user.email || "");
      } else {
        setCurrentUser(null);
        setUsername("");
        setEmail("");
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  const handleSaveChanges = () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword && !currentPassword) {
      toast.error("Please enter your current password to set a new one.");
      return;
    }

    // TODO: Implement actual save logic for username, email, and password using Supabase
    // For username/email (if different from Supabase full_name/email, these might be custom fields or need different handling)
    // For password: await supabase.auth.updateUser({ password: newPassword }) - this requires current password flow or other checks for security.
    // Consider how to update user_metadata.full_name if 'username' state is meant for that.
    console.log("Saving changes:", { username, email, newPassword });
    toast.success("Account settings saved successfully! (Mock)") // Update to reflect real save
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsEditingUsername(false);
    setIsEditingEmail(false);
  };

  const handleDeleteAccount = async () => {
    console.log("Account deletion requested");
    // TODO: Implement actual account deletion on the backend (e.g., calling a Supabase Edge Function)
    // This is a placeholder for client-side actions after backend confirms deletion.
    
    await supabase.auth.signOut(); // Sign out the user
    toast.success("Account deleted successfully. (Mock)", { description: "You have been logged out and redirected." });
    router.push("/");
    router.refresh(); // To ensure UI updates correctly
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
          <Label htmlFor="username">Full Name (from Supabase)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditingUsername} // Or manage this based on user_metadata.full_name directly
              className="flex-grow"
            />
            <Button variant="outline" onClick={() => setIsEditingUsername(!isEditingUsername)}>
              {isEditingUsername ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>

        {/* Email Section */}
        <div className="space-y-2">
          <Label htmlFor="email">Email (from Supabase)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Email change needs a verification flow via Supabase
              disabled={!isEditingEmail} // Or handle differently if email change is complex
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
        <Button onClick={handleSaveChanges} className="w-full sm:w-auto" disabled={!currentUser}>Save All Changes</Button>
        
        <Separator orientation="vertical" className="hidden sm:block h-auto" />

        {/* Danger Zone - Delete Account Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full sm:w-auto" disabled={!currentUser}>Delete Account</Button>
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
              <AlertDialogAction 
                onClick={handleDeleteAccount} 
                className={buttonVariants({ variant: "destructive" })}
                disabled={!currentUser}
              >
                Yes, Delete My Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
} 