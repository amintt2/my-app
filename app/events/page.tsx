"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { CalendarEvent } from "@/types/calendar"
import { Button, buttonVariants } from "@/components/ui/button"
import { PlusIcon, EditIcon, Trash2Icon } from "lucide-react"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CreateEventForm } from "@/components/calendar/CreateEventForm"
import { toast } from "sonner"

// Get dates for realistic sample data
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const nextWeek = new Date(today)
nextWeek.setDate(nextWeek.getDate() + 7)

// Create sample events with realistic dates
const sampleEventsData: CalendarEvent[] = [
  { date: today, title: "Team Meeting", type: "work" },
  { date: tomorrow, title: "Doctor's Appointment", type: "personal" },
  { date: nextWeek, title: "Project Deadline", type: "work" },
]

export default function EventsPage() {
  const [events, setEvents] = React.useState<CalendarEvent[]>(sampleEventsData)
  const [isCreateEditSheetOpen, setIsCreateEditSheetOpen] = React.useState(false)
  const [eventToEdit, setEventToEdit] = React.useState<CalendarEvent | undefined>(undefined)
  const [eventToDelete, setEventToDelete] = React.useState<CalendarEvent | undefined>(undefined)

  const handleCreateNewEvent = () => {
    setEventToEdit(undefined); // Ensure we are in create mode
    setIsCreateEditSheetOpen(true);
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEventToEdit(event);
    setIsCreateEditSheetOpen(true);
  }

  const handleEventFormSubmit = (submittedEvent: CalendarEvent) => {
    if (eventToEdit && submittedEvent.id) { // Editing existing event
      setEvents(prevEvents => 
        prevEvents.map(ev => ev.id === submittedEvent.id ? submittedEvent : ev)
      );
      toast.success("Event updated successfully!");
    } else { // Creating new event
      const newEventWithId = { ...submittedEvent, id: crypto.randomUUID() }; // Add ID for new events
      setEvents(prevEvents => [newEventWithId, ...prevEvents]);
      toast.success("Event created successfully!");
    }
    setIsCreateEditSheetOpen(false);
    setEventToEdit(undefined);
  }

  const confirmDeleteEvent = (event: CalendarEvent) => {
    setEventToDelete(event);
  }

  const handleDeleteEvent = () => {
    if (!eventToDelete) return;
    setEvents(prevEvents => prevEvents.filter(ev => ev.id !== eventToDelete.id));
    toast.success(`Event "${eventToDelete.title}" deleted.`);
    setEventToDelete(undefined); // Close dialog by clearing the event to delete
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Events</h1>
          <Button onClick={handleCreateNewEvent}>
            <PlusIcon className="mr-2 h-4 w-4" /> Create New Event
          </Button>
        </div>

        <Sheet open={isCreateEditSheetOpen} onOpenChange={(isOpen) => {
          setIsCreateEditSheetOpen(isOpen);
          if (!isOpen) setEventToEdit(undefined); // Reset eventToEdit when sheet closes
        }}>
          <SheetContent side="right" className="sm:max-w-lg p-0">
            <CreateEventForm 
              key={eventToEdit?.id || 'create'}
              onEventSubmit={handleEventFormSubmit} 
              initialData={eventToEdit} 
            />
          </SheetContent>
        </Sheet>

        <AlertDialog open={!!eventToDelete} onOpenChange={(isOpen) => !isOpen && setEventToDelete(undefined)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{`Delete Event: "${eventToDelete?.title}"?`}</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the event.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setEventToDelete(undefined)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEvent} className={buttonVariants({ variant: "destructive" })}>
                Yes, Delete Event
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">No Events Yet</h2>
            <p className="text-muted-foreground mb-4">Click the button above to create your first event.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="p-4 bg-card rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-card-foreground">{event.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - <span className="capitalize">{event.type}</span>
                    </p>
                    {event.description && (
                      <p className="mt-2 text-sm text-card-foreground whitespace-pre-wrap">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 shrink-0 ml-4">
                    <Button variant="outline" size="icon" onClick={() => handleEditEvent(event)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit Event</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => confirmDeleteEvent(event)}>
                      <Trash2Icon className="h-4 w-4" />
                      <span className="sr-only">Delete Event</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  )
} 