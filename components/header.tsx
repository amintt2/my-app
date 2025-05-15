"use client"

import { useState, useEffect } from "react"
import { Bell, Clock, Settings, User, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Format time as HH:MM
  const formattedTime =
    currentTime.getHours().toString().padStart(2, "0") + ":" + currentTime.getMinutes().toString().padStart(2, "0")

  const aiSuggestions = [
    {
      title: "Coder Projet X",
      duration: "2h",
      time: "Lundi 10h-12h",
      note: "comme la semaine dernière",
    },
    {
      title: "Cours Python",
      duration: "1h",
      time: "Mardi 8h-9h",
      note: "slot libre",
    },
    {
      title: "Préparation Semaine",
      duration: "2h",
      time: "Dimanche 15h-17h",
      note: "habitude du dimanche",
    },
  ]

  return (
    <header className="border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-purple-700">CronoSync</h1>
          <div className="hidden items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 md:flex">
            <span>Mieux gérer le temps</span>
            <span className="mx-1">•</span>
            <span>Respecter les temps de pause</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input placeholder="Rechercher..." className="pl-8 text-sm" />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* AI Suggestions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700">
                  <Sparkles size={16} className="text-purple-600" />
                  <span>Suggestions IA</span>
                  <ChevronDown size={14} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center gap-1">
                  <Sparkles size={14} className="text-purple-600" />
                  <span>Suggestions IA</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {aiSuggestions.map((suggestion, index) => (
                  <DropdownMenuItem key={index} className="flex flex-col items-start p-3 hover:bg-purple-50">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">{suggestion.title}</span>
                      <span className="text-sm text-gray-500">{suggestion.duration}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {suggestion.time} ({suggestion.note})
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-center p-2 text-purple-700 hover:bg-purple-50">
                  <span>Voir toutes les suggestions</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Purple time display */}
            <div className="flex items-center gap-1 rounded-md bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700">
              <Clock size={16} className="text-purple-600" />
              <span>{formattedTime}</span>
            </div>

            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-purple-100">
              <User size={20} className="text-purple-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
