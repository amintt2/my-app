import { Calendar } from "@/components/calendar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendrier | CronoSync",
  description: "Gérez votre temps efficacement avec notre calendrier intelligent",
}

export default function CalendarPage() {
  return <Calendar />
}