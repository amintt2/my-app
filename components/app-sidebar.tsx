"use client"

import type * as React from "react"
import {
  BookOpen,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Shield,
  Sword,
  Users,
  Crown,
  ChevronDown,
  ExternalLink,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items
const items = [
  {
    title: "Accueil",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Règlement",
    url: "#",
    icon: FileText,
  },
  {
    title: "Lore",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Classements",
    url: "#",
    icon: Crown,
  },
]

const gameItems = [
  {
    title: "Serveurs",
    url: "#",
    icon: Shield,
  },
  {
    title: "Guildes",
    url: "#",
    icon: Users,
  },
  {
    title: "PvP",
    url: "#",
    icon: Sword,
  },
]

const socialItems = [
  {
    title: "Discord",
    url: "https://discord.gg/cbQbt6jHTS",
    icon: MessageSquare,
    external: true,
  },
  {
    title: "Support",
    url: "https://discord.gg/cbQbt6jHTS",
    icon: Settings,
    external: true,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-lg font-bold text-foreground">Le Royaume</h1>
                <h2 className="text-sm font-semibold text-blue-400">Des Tempêtes</h2>
                <Badge variant="secondary" className="mt-1 text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                  #SOON
                </Badge>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Jeu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {gameItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Communauté</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                      {item.external && <ExternalLink className="ml-auto h-4 w-4" />}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Taxhaa" />
                    <AvatarFallback className="rounded-lg bg-blue-600 text-white">TX</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Taxhaa</span>
                    <span className="truncate text-xs text-muted-foreground">Joueur</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Voir le profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
