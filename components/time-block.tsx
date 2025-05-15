import { Clock, Lock, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeBlockProps {
  start: number
  duration: number
  title: string
  type: "focus" | "meeting" | "admin" | "coding" | "learning" | "break" | "research" | "personal" | "mixed"
  note?: string
  fixed?: boolean
  apps?: string[]
  grouped?: boolean
}

export function TimeBlock({
  start,
  duration,
  title,
  type,
  note,
  fixed = false,
  apps = [],
  grouped = false,
}: TimeBlockProps) {
  const top = (start - 8) * 80 // 8h is the first hour, each hour is 80px
  const height = duration * 80

  const getTypeStyles = () => {
    switch (type) {
      case "focus":
        return "bg-red-100 border-red-300 text-red-800"
      case "meeting":
        return "bg-blue-100 border-blue-300 text-blue-800"
      case "admin":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "coding":
        return "bg-purple-100 border-purple-300 text-purple-800"
      case "learning":
        return "bg-green-100 border-green-300 text-green-800"
      case "break":
        return "bg-gray-100 border-gray-300 text-gray-800"
      case "research":
        return "bg-indigo-100 border-indigo-300 text-indigo-800"
      case "personal":
        return "bg-pink-100 border-pink-300 text-pink-800"
      case "mixed":
        return "bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 border-purple-300 text-purple-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  return (
    <div
      className={cn("absolute left-1 right-1 rounded-md border p-2 shadow-sm", getTypeStyles(), fixed && "border-l-4")}
      style={{
        top: `${top}px`,
        height: `${height - 4}px`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="font-medium">{title}</div>
        {fixed && <Lock size={14} />}
      </div>

      <div className="mt-1 flex items-center gap-1 text-xs opacity-80">
        <Clock size={12} />
        <span>{duration}h</span>
      </div>

      {apps.length > 0 && (
        <div className="mt-1 flex items-center gap-1 text-xs opacity-80">
          <Monitor size={12} />
          <span>{apps.join(", ")}</span>
        </div>
      )}

      {note && <div className="mt-1 text-xs italic opacity-80">{note}</div>}

      {grouped && (
        <div className="mt-1 flex flex-wrap gap-1">
          <span className="rounded-full bg-white bg-opacity-50 px-1.5 py-0.5 text-xs">Code</span>
          <span className="rounded-full bg-white bg-opacity-50 px-1.5 py-0.5 text-xs">Lecture</span>
          <span className="rounded-full bg-white bg-opacity-50 px-1.5 py-0.5 text-xs">Réunion</span>
        </div>
      )}
    </div>
  )
}
