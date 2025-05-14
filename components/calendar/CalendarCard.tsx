"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarCardProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function CalendarCard({ date, onDateChange }: CalendarCardProps) {
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
            {days.map((day) => (
              <div 
                key={day} 
                className={`py-2 text-sm cursor-pointer rounded-full hover:bg-muted ${
                  isSelectedDay(day) ? 'bg-primary text-primary-foreground font-medium' : ''
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ))}
            
            {/* Fill remaining cells with next month days */}
            {Array.from({ length: (7 - ((days.length + prevMonthDays.length) % 7)) % 7 }, (_, i) => (
              <div key={`next-${i}`} className="py-2 text-sm text-muted-foreground/50">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
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