"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/layout/Header"
import { AppSidebar } from "@/components/layout/AppSidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="grid grid-rows-[auto_1fr] min-h-screen w-full">
        <Header />
        
        <div className="grid grid-cols-[auto_1fr] relative w-full">
          <AppSidebar />
          <main className="w-full px-3 sm:px-5 py-5 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
} 