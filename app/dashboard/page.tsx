import { BarChart2, Clock, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Vue d'ensemble de votre productivité et de vos tâches</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tâches Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4/7</div>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500">3 tâches restantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Heures Productives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5.2h</div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-xs text-green-500">+12% vs semaine dernière</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Réunions Prévues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <Users className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500">2h30 cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Efficacité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">87%</div>
              <BarChart2 className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-xs text-purple-500">Objectif atteint</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition du Temps</CardTitle>
            <CardDescription>Comment vous utilisez votre temps cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 rounded-md bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Graphique de répartition du temps</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tâches à Venir</CardTitle>
            <CardDescription>Prochaines tâches prioritaires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-md border p-3">
                  <div
                    className={`h-2 w-2 rounded-full ${i === 1 ? "bg-red-500" : i === 2 ? "bg-yellow-500" : "bg-green-500"}`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium">Tâche Prioritaire {i}</p>
                    <p className="text-sm text-gray-500">Demain, 10:00 - 11:30</p>
                  </div>
                  <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    {i === 1 ? "Urgent" : i === 2 ? "Important" : "Normal"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
