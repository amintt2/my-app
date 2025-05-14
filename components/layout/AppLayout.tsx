"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/layout/Header"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Footer } from "@/components/layout/Footer"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        
        <div className="flex flex-1 relative w-full">
          <AppSidebar />
          <main className="flex-1 w-full px-3 sm:px-5 py-5">
            {children}
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  )
} 