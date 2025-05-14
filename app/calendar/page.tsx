"use client"

import * as React from "react"
import { CalendarCard } from "@/components/calendar/CalendarCard"
import { EventsCard } from "@/components/calendar/EventsCard"
import { AppLayout } from "@/components/layout/AppLayout"
import { CalendarEvent } from "@/types/calendar"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Get dates for realistic sample data
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  // Create sample events with realistic dates
  const [events] = React.useState<CalendarEvent[]>([
    { date: today, title: "Team Meeting", type: "work" },
    { date: tomorrow, title: "Doctor's Appointment", type: "personal" },
    { date: nextWeek, title: "Project Deadline", type: "work" },
  ])

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
        <div className="lg:col-span-5">
          <CalendarCard
            date={date}
            onDateChange={setDate}
          />
        </div>

        <div className="lg:col-span-2">
          <EventsCard
            events={events}
            selectedDate={date}
          />
        </div>
      </div>
    </AppLayout>
  )
} 