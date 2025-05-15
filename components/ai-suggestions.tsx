import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AiSuggestions() {
  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-purple-600" />
          <CardTitle className="text-sm font-medium text-purple-700">Suggestions IA</CardTitle>
        </div>
        <CardDescription className="text-xs text-purple-600">Basées sur vos habitudes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div className="rounded-md bg-white p-2 text-xs shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Coder Projet X</span>
            <span className="text-gray-500">2h</span>
          </div>
          <div className="mt-1 text-gray-500">Lundi 10h-12h (comme la semaine dernière)</div>
        </div>

        <div className="rounded-md bg-white p-2 text-xs shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Cours Python</span>
            <span className="text-gray-500">1h</span>
          </div>
          <div className="mt-1 text-gray-500">Mardi 8h-9h (slot libre)</div>
        </div>

        <Button size="sm" variant="outline" className="mt-2 w-full text-xs text-purple-700">
          Voir toutes les suggestions
        </Button>
      </CardContent>
    </Card>
  )
}
