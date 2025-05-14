"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/types/calendar"

interface EventsCardProps {
  events: CalendarEvent[]
  selectedDate: Date | undefined
  title?: string
}

export function EventsCard({ events, selectedDate, title = "Upcoming Events" }: EventsCardProps) {
  // Format date as MM/DD/YYYY
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/')
  }

  // Filter events to only show those on the selected date
  const filteredEvents = React.useMemo(() => {
    if (!selectedDate) return events
    
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === selectedDate.getDate() && 
             eventDate.getMonth() === selectedDate.getMonth() && 
             eventDate.getFullYear() === selectedDate.getFullYear()
    })
  }, [events, selectedDate])

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          Events for {selectedDate ? formatDate(selectedDate) : 'today'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {filteredEvents.length > 0 ? (
          <div className="space-y-3">
            {filteredEvents.map((event, index) => (
              <div key={index} className="flex items-start justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.date)}
                  </p>
                </div>
                <Badge 
                  variant={event.type === 'work' ? 'default' : 'secondary'}
                  className={`text-xs ${event.type === 'work' ? 'bg-black text-white' : 'bg-secondary'}`}
                >
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground text-xs">No events scheduled for this day</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" size="sm">View All Events</Button>
      </CardFooter>
    </Card>
  )
} 