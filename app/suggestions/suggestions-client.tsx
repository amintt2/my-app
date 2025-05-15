"use client"

import { useState } from "react"
import { Sparkles, Plus, Clock, Calendar, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SuggestionsClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const suggestions = [
    {
      id: 1,
      title: "Coder Projet X",
      duration: "2h",
      time: "Lundi 10h-12h",
      note: "comme la semaine dernière",
      category: "work",
    },
    {
      id: 2,
      title: "Cours Python",
      duration: "1h",
      time: "Mardi 8h-9h",
      note: "slot libre",
      category: "learning",
    },
    {
      id: 3,
      title: "Préparation Semaine",
      duration: "2h",
      time: "Dimanche 15h-17h",
      note: "habitude du dimanche",
      category: "planning",
    },
    {
      id: 4,
      title: "Sport",
      duration: "1h",
      time: "Mercredi 17h-18h",
      note: "créer habitude régulière",
      category: "health",
    },
    {
      id: 5,
      title: "Emails",
      duration: "1h",
      time: "Jeudi 17h-18h",
      note: "tâche récurrente",
      category: "admin",
    },
    {
      id: 6,
      title: "Projet IA",
      duration: "2h",
      time: "Mercredi 14h-16h",
      note: "slot libre + priorité",
      category: "work",
    },
  ]

  const filteredSuggestions = selectedCategory === "all"
    ? suggestions
    : suggestions.filter(s => s.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "work": return "bg-purple-100 text-purple-700"
      case "learning": return "bg-green-100 text-green-700"
      case "planning": return "bg-cyan-100 text-cyan-700"
      case "health": return "bg-pink-100 text-pink-700"
      case "admin": return "bg-yellow-100 text-yellow-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case "work": return "Travail"
      case "learning": return "Apprentissage"
      case "planning": return "Planning"
      case "health": return "Santé"
      case "admin": return "Admin"
      default: return category
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Suggestions IA</h1>
          <p className="text-gray-500">Optimisez votre emploi du temps avec des suggestions intelligentes</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" />
          Appliquer toutes
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>Toutes</TabsTrigger>
          <TabsTrigger value="work" onClick={() => setSelectedCategory("work")}>Travail</TabsTrigger>
          <TabsTrigger value="learning" onClick={() => setSelectedCategory("learning")}>Apprentissage</TabsTrigger>
          <TabsTrigger value="planning" onClick={() => setSelectedCategory("planning")}>Planning</TabsTrigger>
          <TabsTrigger value="health" onClick={() => setSelectedCategory("health")}>Santé</TabsTrigger>
          <TabsTrigger value="admin" onClick={() => setSelectedCategory("admin")}>Admin</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden">
                <CardHeader className="bg-purple-50 pb-3 pt-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{suggestion.title}</CardTitle>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-600">
                      {suggestion.duration}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" /> 
                    <span>{suggestion.time}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{suggestion.note}</p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(suggestion.category)}`}>
                          {getCategoryLabel(suggestion.category)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 bg-gray-50 px-4 py-3">
                  <Button variant="outline" size="sm" className="h-8">
                    Modifier
                  </Button>
                  <Button size="sm" className="h-8 bg-purple-600 hover:bg-purple-700">
                    Accepter
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredSuggestions.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">
              <Sparkles size={24} className="mb-2 text-purple-400" />
              <p className="text-lg font-medium">Aucune suggestion pour cette catégorie</p>
              <p className="text-sm text-gray-500">Essayez une autre catégorie ou revenez plus tard</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-purple-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-600" />
            <CardTitle className="text-lg">Comment fonctionnent les suggestions ?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Clock size={20} className="text-purple-600" />
              </div>
              <h3 className="mb-1 font-medium">Analyse de vos habitudes</h3>
              <p className="text-sm text-gray-600">L&apos;IA analyse vos habitudes de travail et vos préférences horaires.</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <h3 className="mb-1 font-medium">Optimisation du calendrier</h3>
              <p className="text-sm text-gray-600">Les tâches sont placées aux moments optimaux de votre journée.</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <CheckCircle2 size={20} className="text-purple-600" />
              </div>
              <h3 className="mb-1 font-medium">Amélioration continue</h3>
              <p className="text-sm text-gray-600">L&apos;IA s&apos;améliore avec le temps en fonction de vos feedbacks.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 