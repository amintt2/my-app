"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent, EventType } from "@/types/calendar"
import { ClockIcon, TagIcon, CalendarDaysIcon, FileTextIcon } from "lucide-react"

interface EventsCardProps {
  events: CalendarEvent[]
  selectedDate?: Date
  title?: string
  showUpcomingOnlyWhenNoDate?: boolean
}

export function EventsCard({ 
  events, 
  selectedDate, 
  title = "Events",
  showUpcomingOnlyWhenNoDate = true 
}: EventsCardProps) {
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const filteredEvents = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate) {
      const selDateStart = new Date(selectedDate);
      selDateStart.setHours(0, 0, 0, 0);
      const selDateEnd = new Date(selectedDate);
      selDateEnd.setHours(23, 59, 59, 999);

      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= selDateStart && eventDate <= selDateEnd;
      });
    } else if (showUpcomingOnlyWhenNoDate) {
      return events.filter(event => new Date(event.date) >= today).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedDate, showUpcomingOnlyWhenNoDate])

  const getEventTypeUIData = (type: EventType) => {
    switch (type) {
      case 'work':
        return { icon: <ClockIcon className="h-3 w-3" />, color: "bg-blue-500", label: "Work" };
      case 'personal':
        return { icon: <TagIcon className="h-3 w-3" />, color: "bg-green-500", label: "Personal" };
      default:
        return { icon: <CalendarDaysIcon className="h-3 w-3" />, color: "bg-gray-400", label: "Other" };
    }
  }

  return (
    <Card className="border shadow-sm flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {selectedDate 
            ? `Events for ${formatDate(selectedDate)}` 
            : showUpcomingOnlyWhenNoDate ? "Upcoming events from today" : "All scheduled events"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-3 pr-3 pl-3 pt-0 pb-3">
        {filteredEvents.length > 0 ? (
          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const eventTypeUI = getEventTypeUIData(event.type);
              return (
                <div key={event.id || new Date(event.date).toISOString()} className="p-3 border rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-card-foreground">{event.title}</p>
                    <Badge 
                      variant={"outline"}
                      className={`text-xs px-1.5 py-0.5 border-0 ${eventTypeUI.color} text-white`}
                    >
                      <span className="mr-1">{eventTypeUI.icon}</span>
                      {eventTypeUI.label}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-3 w-3 mr-1.5" />
                      <span>{formatDate(new Date(event.date))} at {formatTime(new Date(event.date))}</span>
                    </div>
                    {event.description && (
                      <div className="flex items-start">
                        <FileTextIcon className="h-3 w-3 mr-1.5 mt-0.5 shrink-0" />
                        <p className="truncate hover:whitespace-normal">{event.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-muted-foreground text-sm">
              {selectedDate ? "No events for this day." : "No upcoming events."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <Button variant="outline" className="w-full" size="sm">View All Events</Button>
      </CardFooter>
    </Card>
  )
} 