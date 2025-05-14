"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet" // Assuming SheetClose will be used if this form is in a Sheet
import { CalendarEvent, EventType } from "@/types/calendar" // Assuming you have this type
import { toast } from "sonner" // Import toast

interface CreateEventFormProps {
  onEventSubmit: (eventData: CalendarEvent) => void;
  initialData?: CalendarEvent;
}

export function CreateEventForm({ onEventSubmit, initialData }: CreateEventFormProps) {
  const [eventId, setEventId] = React.useState<string | undefined>(undefined);
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = React.useState("10:00");
  const [type, setType] = React.useState<EventType>("work");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setEventId(initialData.id);
      setTitle(initialData.title || "");
      setDate(initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
      setTime(initialData.date ? new Date(initialData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "10:00");
      if (initialData.type && ["work", "personal", "other"].includes(initialData.type)) {
        setType(initialData.type as EventType);
      } else {
        setType("work");
      }
      setDescription(initialData.description || "");
    } else {
      // Reset form for creating new event if initialData is undefined or cleared
      setEventId(undefined);
      setTitle("");
      setDate(new Date().toISOString().split("T")[0]);
      setTime("10:00");
      setType("work");
      setDescription("");
      setIsLoading(false); // Ensure loading is reset too
    }
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!title.trim()) {
      toast.error("Event title cannot be empty.");
      setIsLoading(false);
      return;
    }
    if (!date || !time) {
      toast.error("Please select a valid date and time.");
      setIsLoading(false);
      return;
    }

    const combinedDateTime = new Date(`${date}T${time}`);
    const eventData: CalendarEvent = {
      id: eventId, // Include id if it exists (editing)
      title,
      date: combinedDateTime,
      type,
      description,
    };

    onEventSubmit(eventData); // Use the correct callback prop name
    // setIsLoading(false); // Parent should handle this by closing sheet / re-rendering
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full">
      <SheetHeader className="px-6 pt-6 pb-0">
        <SheetTitle>{initialData?.id ? "Edit Event" : "Create New Event"}</SheetTitle>
        <SheetDescription>
          {initialData?.id ? "Update the details for your event." : "Fill in the details below to add a new event."}
        </SheetDescription>
      </SheetHeader>

      <div className="px-6 space-y-4 flex-grow overflow-y-auto">
        <div>
          <Label htmlFor="event-title">Event Title</Label>
          <Input id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Team Meeting" required disabled={isLoading} className="mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="event-date">Date</Label>
            <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required disabled={isLoading} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="event-time">Time</Label>
            <Input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required disabled={isLoading} className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="event-type">Event Type</Label>
          <Select 
            onValueChange={(value) => {
              if ([("work" as EventType), ("personal" as EventType), ("other" as EventType)].includes(value as EventType)) {
                setType(value as EventType);
              }
            }} 
            value={type} 
            disabled={isLoading}
          >
            <SelectTrigger id="event-type" className="w-full mt-1"><SelectValue placeholder="Select event type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="event-description">Description (Optional)</Label>
          <Textarea id="event-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add any additional details..." rows={3} disabled={isLoading} className="mt-1" />
        </div>
      </div>

      <SheetFooter className="px-6 pb-6 pt-4 mt-auto border-t">
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (initialData?.id ? "Saving..." : "Creating...") : (initialData?.id ? "Save Changes" : "Create Event")}
        </Button>
      </SheetFooter>
    </form>
  );
} 