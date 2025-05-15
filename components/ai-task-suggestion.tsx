"use client"

import { useState } from "react"
import { Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AiTaskSuggestionProps {
  start: number
  duration: number
  title: string
  type: "focus" | "meeting" | "admin" | "coding" | "learning" | "break" | "research" | "personal" | "planning" | "mixed"
  reason: string
}

export function AiTaskSuggestion({ start, duration, title, type, reason }: AiTaskSuggestionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const top = (start - 8) * 80 // 8h is the first hour, each hour is 80px
  const height = duration * 80

  const getTypeStyles = () => {
    switch (type) {
      case "focus":
        return "bg-red-50 border-red-200 text-red-800"
      case "meeting":
        return "bg-blue-50 border-blue-200 text-blue-800"
      case "admin":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "coding":
        return "bg-purple-50 border-purple-200 text-purple-800"
      case "learning":
        return "bg-green-50 border-green-200 text-green-800"
      case "break":
        return "bg-gray-50 border-gray-200 text-gray-800"
      case "research":
        return "bg-indigo-50 border-indigo-200 text-indigo-800"
      case "personal":
        return "bg-pink-50 border-pink-200 text-pink-800"
      case "planning":
        return "bg-cyan-50 border-cyan-200 text-cyan-800"
      case "mixed":
        return "bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-purple-200 text-purple-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  return (
    <div
      className="relative"
      style={{
        position: "absolute",
        top: `${top}px`,
        left: "4px",
        right: "4px",
        height: `${height - 4}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button
          className="absolute -right-2 -top-2 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500 shadow-md hover:bg-gray-200 hover:text-gray-700"
          style={{ transform: "translate(0, 0)" }}
        >
          <X size={12} />
        </button>
      )}

      <div
        className={cn(
          "absolute inset-0 rounded-md border border-dashed p-2 shadow-sm transition-all",
          getTypeStyles(),
          isHovered && "ring-2 ring-purple-300",
        )}
      >
        <div className="flex items-start">
          <div className="font-medium">{title}</div>
          <Sparkles size={14} className="ml-1 text-purple-600" />
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs opacity-80">
          <span>{duration}h</span>
        </div>

        <div className="mt-1 flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
          <Sparkles size={10} />
          <span>{reason}</span>
        </div>

        {isHovered && (
          <div className="absolute bottom-2 right-2 z-20 flex flex-col gap-1 transition-opacity">
            <button className="rounded-md bg-white px-3 py-1 text-xs font-medium text-purple-700 shadow-sm hover:bg-purple-50">
              Accepter
            </button>
            <button className="rounded-md bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50">
              Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
