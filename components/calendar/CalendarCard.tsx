"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarEvent } from "@/types/calendar" // Assuming this path is correct

interface CalendarCardProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  events?: CalendarEvent[] // Add events prop
}

export function CalendarCard({ date, onDateChange, events = [] }: CalendarCardProps) { // Provide default for events
  const currentDate = date || new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Calculate days in month and first day of month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  
  // Get previous month's days that should appear in the calendar
  const prevMonthDays = []
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    prevMonthDays.unshift(prevMonthLastDay - i)
  }
  
  // Create array of days for current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  
  // Navigate to next or previous month
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentYear, currentMonth + (direction === 'next' ? 1 : -1), 1)
    onDateChange(newDate)
  }

  // Check if a day is selected
  const isSelectedDay = (day: number) => {
    return date && day === date.getDate() && 
           currentMonth === date.getMonth() && 
           currentYear === date.getFullYear()
  }

  // Handle day click
  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    onDateChange(newDate)
  }

  const getEventsForDay = (day: number, month: number, year: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year
    })
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Calendar</CardTitle>
        <CardDescription>Schedule and manage your events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={() => navigateMonth('prev')} 
              className="p-1.5 rounded-full hover:bg-muted"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-medium">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button 
              onClick={() => navigateMonth('next')} 
              className="p-1.5 rounded-full hover:bg-muted"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
              <div key={i} className="py-1.5 text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Previous month days */}
            {prevMonthDays.map((day, i) => (
              <div key={`prev-${i}`} className="py-2 text-sm text-muted-foreground/50">
                {day}
              </div>
            ))}
            
            {/* Current month days */}
            {days.map((day) => {
              const dayEvents = getEventsForDay(day, currentMonth, currentYear)
              const selectedClass = isSelectedDay(day) ? 'bg-primary text-primary-foreground font-medium' : ''; // Pre-calculate conditional class
              return (
                <div 
                  key={day} 
                  className={`py-2 text-sm cursor-pointer rounded-full hover:bg-muted relative ${selectedClass}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-0.5">
                      {dayEvents.slice(0, 3).map((_, index) => ( // Show max 3 dots
                        <div key={index} className="h-1 w-1 bg-blue-500 rounded-full"></div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            
            {/* Fill remaining cells with next month days */}
            {Array.from({ length: (7 - ((days.length + prevMonthDays.length) % 7)) % 7 }, (_, i) => (
              <div key={`next-${i}`} className="py-2 text-sm text-muted-foreground/50">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Display events for selected day */}
        {date && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">
              Events for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}:
            </h3>
            {(() => {
              const selectedDayEvents = getEventsForDay(date.getDate(), date.getMonth(), date.getFullYear())
              if (selectedDayEvents.length > 0) {
                return (
                  <ul className="space-y-1 text-xs">
                    {selectedDayEvents.map((event, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`mr-2 h-2 w-2 rounded-full ${event.type === 'work' ? 'bg-blue-500' : event.type === 'personal' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {event.title}
                        {event.description && <span className="text-muted-foreground ml-1">- {event.description}</span>}
                      </li>
                    ))}
                  </ul>
                )
              } else {
                return <p className="text-xs text-muted-foreground">No events for this day.</p>
              }
            })()}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <span className="text-xs text-muted-foreground">
          {date ? date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : "Select a date"}
        </span>
        <Button variant="outline" size="sm">
          Add Event
        </Button>
      </CardFooter>
    </Card>
  )
} 