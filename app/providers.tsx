"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
// import { AuthProvider } from "@/contexts/AuthContext" // Removed
// import { SessionProvider } from "next-auth/react" // Removed
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider> // Removed
    //   <AuthProvider> // Removed
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
    //   </AuthProvider> // Removed
    // </SessionProvider> // Removed
  )
} 