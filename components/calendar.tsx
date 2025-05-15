"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TimeBlock } from "@/components/time-block"
import { AiTaskSuggestion } from "@/components/ai-task-suggestion"
import { CurrentTimeIndicator } from "@/components/current-time-indicator"
import { TaskModal } from "@/components/task-modal"

export function Calendar() {
  const [currentWeek, setCurrentWeek] = useState("15 - 21 Mai 2025")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  const days = [
    { name: "Hier", date: "15", original: "Lundi" },
    { name: "Aujourd'hui", date: "16", original: "Mardi" },
    { name: "Demain", date: "17", original: "Mercredi" },
    { name: "Jeudi", date: "18", original: "Jeudi" },
    { name: "Vendredi", date: "19", original: "Vendredi" },
    { name: "Samedi", date: "20", original: "Samedi" },
    { name: "Dimanche", date: "21", original: "Dimanche" },
  ]

  const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8h to 21h

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Calendrier</h2>
          <div className="flex items-center rounded-md border bg-white px-2 py-1 shadow-sm">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft size={16} />
            </Button>
            <span className="px-2 text-sm font-medium">{currentWeek}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} />
            <span>Ajouter tâche</span>
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            Optimiser semaine
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border">
        <div className="grid grid-cols-8 border-b">
          <div className="border-r p-2 text-center text-sm font-medium text-gray-500">Heures</div>
          {days.map((day, index) => (
            <div
              key={day.name}
              className={cn("border-r p-2 text-center last:border-r-0", index === 0 && "bg-gray-100")}
            >
              <div className="font-medium">{day.name}</div>
              <div className="text-sm text-gray-500">{day.date}</div>
              <div className="text-xs text-gray-400">({day.original})</div>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-8">
          <div className="border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex h-20 items-center justify-center border-b p-2 text-sm font-medium text-gray-500 last:border-b-0"
              >
                {hour}:00
              </div>
            ))}
          </div>

          {/* Monday - Hier */}
          <div className="relative border-r bg-gray-100 bg-opacity-50">
            <TimeBlock start={8} duration={1} title="Cours Python" type="learning" fixed={true} />
            <TimeBlock
              start={10}
              duration={3}
              title="Deep Work: Code Projet"
              type="focus"
              note="Ne pas modifier ce slot"
            />
            <TimeBlock start={14} duration={1} title="Déjeuner" type="break" />
            <TimeBlock start={15} duration={2} title="RDV / Mail" type="admin" />
            <TimeBlock start={18} duration={1} title="Réunion IA" type="meeting" />
          </div>

          {/* Tuesday - Aujourd'hui */}
          <div className="relative border-r">
            {/* Current time indicator properly positioned inside the Tuesday column */}
            <CurrentTimeIndicator />
            <TimeBlock start={8} duration={1} title="Révision Projet" type="research" />
            <TimeBlock start={10} duration={2} title="VSCode" type="coding" apps={["VS Code"]} />
            <TimeBlock start={13} duration={1} title="Déjeuner" type="break" />
            <TimeBlock start={15} duration={3} title="Lecture, Recherche" type="learning" />
          </div>

          {/* Wednesday - Demain */}
          <div className="relative border-r">
            <AiTaskSuggestion start={8} duration={1} title="Cours Python" type="learning" reason="Basé sur habitude" />
            <TimeBlock start={9} duration={3} title="Code, Lecture, Réunion IA" type="mixed" grouped={true} />
            <TimeBlock start={13} duration={1} title="Déjeuner" type="break" />
            <AiTaskSuggestion start={14} duration={2} title="Projet IA" type="coding" reason="Slot libre + priorité" />
            <TimeBlock start={17} duration={2} title="Sport" type="personal" />
          </div>

          {/* Thursday */}
          <div className="relative border-r">
            <TimeBlock start={8} duration={3} title="Deep Work: Projet X" type="focus" note="Ne pas modifier ce slot" />
            <TimeBlock start={12} duration={1} title="Déjeuner" type="break" />
            <TimeBlock start={14} duration={2} title="Google Research" type="research" apps={["Google"]} />
            <AiTaskSuggestion start={17} duration={1} title="Emails" type="admin" reason="Tâche récurrente" />
          </div>

          {/* Friday */}
          <div className="relative border-r">
            <AiTaskSuggestion
              start={8}
              duration={1}
              title="Cours Python"
              type="learning"
              reason="Meilleur moment disponible"
            />
            <TimeBlock start={9} duration={2} title="Réunion Équipe" type="meeting" />
            <TimeBlock start={12} duration={1} title="Déjeuner" type="break" />
            <TimeBlock start={14} duration={3} title="Code Projet" type="coding" apps={["VS Code"]} />
          </div>

          {/* Weekend - mostly empty */}
          <div className="relative border-r">
            <TimeBlock start={10} duration={2} title="Projet Personnel" type="personal" />
          </div>

          <div className="relative">
            <AiTaskSuggestion
              start={15}
              duration={2}
              title="Préparation Semaine"
              type="planning"
              reason="Habitude du dimanche"
            />
          </div>
        </div>
      </Card>

      <TaskModal open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen} />
    </div>
  )
}
