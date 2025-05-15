"use client"

import type React from "react"

import { useState } from "react"
import {
  CalendarIcon,
  Check,
  ChevronDown,
  Code,
  Edit3,
  Flame,
  Lock,
  MessageSquare,
  Plus,
  Save,
  Sparkles,
  Tag,
  Users,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface TaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskModal({ open, onOpenChange }: TaskModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [taskType, setTaskType] = useState("focus")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [duration, setDuration] = useState(1)
  const [isFixed, setIsFixed] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)
  const [aiAssisted, setAiAssisted] = useState(true)
  const [selectedApps, setSelectedApps] = useState<string[]>([])

  const taskTypes = [
    {
      id: "focus",
      name: "Deep Work",
      color: "bg-red-100 border-red-300 text-red-800",
      icon: <Flame size={16} className="text-red-600" />,
    },
    {
      id: "meeting",
      name: "Réunion",
      color: "bg-blue-100 border-blue-300 text-blue-800",
      icon: <Users size={16} className="text-blue-600" />,
    },
    {
      id: "admin",
      name: "Admin",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      icon: <Edit3 size={16} className="text-yellow-600" />,
    },
    {
      id: "coding",
      name: "Coding",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      icon: <Code size={16} className="text-purple-600" />,
    },
    {
      id: "learning",
      name: "Apprentissage",
      color: "bg-green-100 border-green-300 text-green-800",
      icon: <BookIcon size={16} className="text-green-600" />,
    },
    {
      id: "break",
      name: "Pause",
      color: "bg-gray-100 border-gray-300 text-gray-800",
      icon: <Coffee size={16} className="text-gray-600" />,
    },
    {
      id: "research",
      name: "Recherche",
      color: "bg-indigo-100 border-indigo-300 text-indigo-800",
      icon: <Search size={16} className="text-indigo-600" />,
    },
    {
      id: "personal",
      name: "Personnel",
      color: "bg-pink-100 border-pink-300 text-pink-800",
      icon: <Heart size={16} className="text-pink-600" />,
    },
  ]

  const apps = [
    { id: "vscode", name: "VS Code", icon: <Code size={16} /> },
    { id: "google", name: "Google", icon: <Search size={16} /> },
    { id: "slack", name: "Slack", icon: <MessageSquare size={16} /> },
    { id: "figma", name: "Figma", icon: <Edit3 size={16} /> },
  ]

  const toggleApp = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter((id) => id !== appId))
    } else {
      setSelectedApps([...selectedApps, appId])
    }
  }

  const getTaskTypeStyle = (id: string) => {
    const type = taskTypes.find((t) => t.id === id)
    return type ? type.color : ""
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus size={18} className="text-purple-600" />
            Nouvelle Tâche
          </DialogTitle>
          <DialogDescription>
            Créez une nouvelle tâche dans votre calendrier. Les champs avec * sont obligatoires.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-title" className="font-medium">
              Titre de la tâche *
            </Label>
            <Input id="task-title" placeholder="Ex: Réunion d'équipe, Coder projet X..." className="h-10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="font-medium">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label className="font-medium">Heure de début *</Label>
              <Select defaultValue="9">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'heure" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => i + 8).map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Durée: {duration}h</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setDuration(Math.max(0.5, duration - 0.5))}
                >
                  <Minus size={12} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setDuration(Math.min(8, duration + 0.5))}
                >
                  <Plus size={12} />
                </Button>
              </div>
            </div>
            <Slider
              value={[duration * 2]}
              min={1}
              max={16}
              step={1}
              onValueChange={(value) => setDuration(value[0] / 2)}
              className="py-2"
            />
          </div>

          <div className="grid gap-2">
            <Label className="font-medium">Type de tâche *</Label>
            <div className="grid grid-cols-4 gap-2">
              {taskTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className={cn(
                    "flex h-auto flex-col items-center gap-1 p-2",
                    taskType === type.id && type.color,
                    taskType === type.id && "ring-2 ring-offset-1",
                    taskType === type.id && type.id === "focus" && "ring-red-300",
                    taskType === type.id && type.id === "meeting" && "ring-blue-300",
                    taskType === type.id && type.id === "admin" && "ring-yellow-300",
                    taskType === type.id && type.id === "coding" && "ring-purple-300",
                    taskType === type.id && type.id === "learning" && "ring-green-300",
                    taskType === type.id && type.id === "break" && "ring-gray-300",
                    taskType === type.id && type.id === "research" && "ring-indigo-300",
                    taskType === type.id && type.id === "personal" && "ring-pink-300",
                  )}
                  onClick={() => setTaskType(type.id)}
                >
                  {type.icon}
                  <span className="text-xs">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="flex items-center gap-1 px-0 text-purple-600"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <ChevronDown size={16} className={cn("transition-transform", showAdvanced && "rotate-180")} />
              Options avancées
            </Button>

            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-600" />
              <Label htmlFor="ai-assist" className="text-sm text-gray-600">
                Assistance IA
              </Label>
              <Switch id="ai-assist" checked={aiAssisted} onCheckedChange={setAiAssisted} />
            </div>
          </div>

          {showAdvanced && (
            <div className="rounded-md border p-4">
              <Tabs defaultValue="options">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="options">Options</TabsTrigger>
                  <TabsTrigger value="apps">Applications</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="options" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock size={16} />
                      <Label htmlFor="fixed-task" className="text-sm">
                        Tâche fixe (ne pas déplacer)
                      </Label>
                    </div>
                    <Switch id="fixed-task" checked={isFixed} onCheckedChange={setIsFixed} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Repeat size={16} />
                      <Label htmlFor="recurring-task" className="text-sm">
                        Tâche récurrente
                      </Label>
                    </div>
                    <Switch id="recurring-task" checked={isRecurring} onCheckedChange={setIsRecurring} />
                  </div>
                  {isRecurring && (
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue placeholder="Fréquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Tous les jours</SelectItem>
                        <SelectItem value="weekly">Toutes les semaines</SelectItem>
                        <SelectItem value="monthly">Tous les mois</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag size={16} />
                      <Label htmlFor="priority" className="text-sm">
                        Priorité
                      </Label>
                    </div>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="low">Basse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="apps" className="pt-4">
                  <div className="mb-2 text-sm text-gray-600">Applications associées à cette tâche:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {apps.map((app) => (
                      <Button
                        key={app.id}
                        variant="outline"
                        className={cn(
                          "justify-start gap-2",
                          selectedApps.includes(app.id) && "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
                        )}
                        onClick={() => toggleApp(app.id)}
                      >
                        {app.icon}
                        <span>{app.name}</span>
                        {selectedApps.includes(app.id) && <Check size={16} className="ml-auto text-purple-600" />}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="pt-4">
                  <Textarea placeholder="Notes additionnelles pour cette tâche..." className="min-h-[120px]" />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div>
            {aiAssisted && (
              <div className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
                <Sparkles size={12} />
                <span>L'IA optimisera l'emplacement de cette tâche</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button className="gap-1 bg-purple-600 hover:bg-purple-700">
              <Save size={16} />
              Enregistrer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Additional icons
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function Coffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function Repeat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  )
}
