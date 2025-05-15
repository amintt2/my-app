"use client"

import * as React from "react"
// import { CalendarCard } from "@/components/calendar/CalendarCard" // Removing full calendar
import { EventsCard } from "@/components/calendar/EventsCard"
import { AppLayout } from "@/components/layout/AppLayout"
import { CalendarEvent } from "@/types/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // For stats cards
import { Users, Briefcase, Star } from "lucide-react"

export default function DashboardPage() {
  const [date] = React.useState<Date | undefined>(new Date()) // Removed setDate, still useful for EventsCard

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  // Explicitly type sample events and add unique IDs
  const sampleEventData: Omit<CalendarEvent, 'id'>[] = [
    { date: today, title: "Team Meeting", type: "work", description: "Discuss project updates" },
    { date: tomorrow, title: "Doctor's Appointment", type: "personal" },
    { date: nextWeek, title: "Project Deadline", type: "work", description: "Submit phase 1 deliverables" },
    { date: today, title: "Lunch with Client", type: "work" },
  ];

  const initialEvents: CalendarEvent[] = sampleEventData.map((event): CalendarEvent => ({ 
    ...event, 
    id: crypto.randomUUID() 
  }));

  const [events] = React.useState<CalendarEvent[]>(initialEvents)

  // Filter events for today to show a summary
  const todaysEvents = events.filter(
    (event) => event.date.toDateString() === today.toDateString()
  )

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Cards Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Events</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                scheduled for today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Upcoming</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">
                in your schedule
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks (Placeholder)</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div> 
              <p className="text-xs text-muted-foreground">
                tasks to complete
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area: Today's Summary and Upcoming Events */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Today's Events Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Today&apos;s Focus</CardTitle>
            </CardHeader>
            <CardContent>
              {todaysEvents.length > 0 ? (
                <ul className="space-y-3">
                  {todaysEvents.map((event, index) => (
                    <li key={index} className="text-sm">
                      <p className="font-medium text-card-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.type}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No events scheduled for today. Enjoy your day!</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events List (EventsCard) */}
          <div className="lg:col-span-2">
            <EventsCard 
              events={events} 
              selectedDate={date} // The date state can be used to highlight a specific day in EventsCard if it supports it
              title="Upcoming Events"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 