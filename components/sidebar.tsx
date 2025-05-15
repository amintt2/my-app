"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  FileText,
  LayoutDashboard,
  ListTodo,
  Users,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AiSuggestions } from "@/components/ai-suggestions"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      name: "Calendrier",
      icon: Calendar,
      href: "/calendar",
      active: pathname === "/calendar",
    },
    {
      name: "Tâches",
      icon: ListTodo,
      href: "/tasks",
      active: pathname === "/tasks",
    },
    {
      name: "Réunions",
      icon: Users,
      href: "/meetings",
      active: pathname === "/meetings",
    },
    {
      name: "Suggestions IA",
      icon: Sparkles,
      href: "/suggestions",
      active: pathname === "/suggestions",
      highlight: true,
    },
    {
      name: "Historique",
      icon: Clock,
      href: "/history",
      active: pathname === "/history",
    },
    {
      name: "Rapports",
      icon: BarChart2,
      href: "/reports",
      active: pathname === "/reports",
    },
    {
      name: "Notes",
      icon: FileText,
      href: "/notes",
      active: pathname === "/notes",
    },
  ]

  return (
    <aside
      className={cn(
        "relative flex h-[calc(100vh-64px)] flex-col border-r bg-white p-4 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border bg-white shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </Button>

      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 text-gray-600",
              isCollapsed && "justify-center px-2",
              item.active && "bg-purple-100 text-purple-700 hover:bg-purple-200",
              item.highlight && "bg-purple-50 text-purple-700 hover:bg-purple-100",
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon size={18} className={item.highlight ? "text-purple-500" : undefined} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </Button>
        ))}
      </div>

      {!isCollapsed && (
        <>
          <div className="mt-8">
            <h3 className="mb-2 px-3 text-sm font-medium text-gray-500">FOCUS ZONES</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span>Deep Work (3h)</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Réunions</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Apprentissage</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>Admin & Emails</span>
              </Button>
            </div>
          </div>

          <div className="mt-auto">
            <AiSuggestions />
          </div>
        </>
      )}

      <div className={cn("mt-4", isCollapsed ? "mt-auto" : "")}>
        <Button
          variant="ghost"
          className={cn("w-full justify-start gap-2 text-gray-600", isCollapsed && "justify-center px-2")}
          asChild
        >
          <Link href="/settings">
            <Cog size={18} />
            {!isCollapsed && <span>Paramètres</span>}
          </Link>
        </Button>
      </div>
    </aside>
  )
}
