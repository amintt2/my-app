import { Metadata } from "next"
import SuggestionsClient from "./suggestions-client"

export const metadata: Metadata = {
  title: "Suggestions IA | CronoSync",
  description: "Suggestions intelligentes pour optimiser votre temps",
}

export default function SuggestionsPage() {
  return <SuggestionsClient />
} 