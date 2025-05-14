"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"

export function ThemeSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Theme</h2>
      <p className="text-muted-foreground mb-2">Customize the application appearance.</p>
      <ThemeToggle />
    </div>
  )
} 