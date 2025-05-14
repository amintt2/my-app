export interface CalendarEvent {
  id?: string;
  date: Date
  title: string
  type: EventType
  description?: string
}

export type EventType = 'work' | 'personal' | 'other' 