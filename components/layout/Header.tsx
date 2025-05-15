"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Needed for redirect after sign out if not handled by Supabase
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
// import { useSession, signIn, signOut } from "next-auth/react" // No longer NextAuth
import { createClient } from "@/lib/supabase/client" // Import Supabase client
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js' // Import Supabase User, Session, and AuthChangeEvent types
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCircle, LogOut, LogIn, UserPlus } from "lucide-react"

export function Header() {
  const supabase = createClient()
  const router = useRouter()
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isLoadingSession, setIsLoadingSession] = React.useState(true)

  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user ?? null);
      setIsLoadingSession(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      setCurrentUser(session?.user ?? null);
      setIsLoadingSession(false);
      // if (event === 'SIGNED_OUT') router.refresh(); // Or handle redirect elsewhere
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase, router]);

  const isAuthenticated = !!currentUser;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to homepage after logout
    router.refresh(); // Ensure UI updates by refreshing server components if any
  };

  const getUserInitials = (user: User | null) => {
    if (!user?.user_metadata?.full_name && !user?.email) return "U";
    const name = user?.user_metadata?.full_name || user?.email || "";
    const parts = name.split(" ");
    if (parts.length > 1 && parts[0] && parts[parts.length -1]) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-3 sm:px-5 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          {isAuthenticated && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/calendar">Calendar</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/events">Events</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoadingSession ? (
            <div className="h-9 w-20 animate-pulse bg-muted rounded-md"></div>
          ) : isAuthenticated && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    {/* currentUser.user_metadata.avatar_url can be used if available */}
                    <AvatarFallback>{getUserInitials(currentUser)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser.user_metadata?.full_name || currentUser.email || "User"}
                    </p>
                    {currentUser.email && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild> 
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 