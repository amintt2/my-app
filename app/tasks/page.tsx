import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tâches</h1>
          <p className="text-gray-500">Gérez et organisez vos tâches</p>
        </div>
        <Button className="gap-1 bg-purple-600 hover:bg-purple-700">
          <Plus size={16} />
          Nouvelle Tâche
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les tâches</CardTitle>
              <CardDescription>Visualisez et gérez toutes vos tâches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-md border p-3">
                    <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                      {i === 3 && <Check size={12} className="text-green-500" />}
                    </Button>
                    <div className="flex-1">
                      <p className="font-medium">Tâche {i}</p>
                      <p className="text-sm text-gray-500">
                        {i % 2 === 0 ? "Aujourd'hui" : "Demain"}, {9 + i}:00 - {10 + i}:30
                      </p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        i === 1
                          ? "bg-red-100 text-red-700"
                          : i === 2
                            ? "bg-yellow-100 text-yellow-700"
                            : i === 3
                              ? "bg-green-100 text-green-700"
                              : i === 4
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {i === 1
                        ? "Urgent"
                        : i === 2
                          ? "Important"
                          : i === 3
                            ? "Terminé"
                            : i === 4
                              ? "En cours"
                              : "Normal"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Tâches d'aujourd'hui</CardTitle>
              <CardDescription>Tâches prévues pour aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-gray-500">Contenu des tâches d'aujourd'hui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Tâches à venir</CardTitle>
              <CardDescription>Tâches planifiées pour les prochains jours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-gray-500">Contenu des tâches à venir</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Tâches terminées</CardTitle>
              <CardDescription>Historique des tâches terminées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <p className="text-gray-500">Contenu des tâches terminées</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
