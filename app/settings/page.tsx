import { Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-gray-500">Gérez vos préférences et paramètres de compte</p>
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">IA & Automatisation</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Utilisateur CronoSync</p>
                  <p className="text-sm text-gray-500">utilisateur@example.com</p>
                </div>
                <Button variant="outline" className="ml-auto">
                  Modifier
                </Button>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" defaultValue="Utilisateur CronoSync" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="utilisateur@example.com" />
                </div>
              </div>

              <Button className="bg-purple-600 hover:bg-purple-700">Enregistrer les modifications</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mot de passe</CardTitle>
              <CardDescription>Mettez à jour votre mot de passe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" />
                </div>
              </div>

              <Button variant="outline">Changer le mot de passe</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon size={18} />
                  <Label htmlFor="dark-mode">Mode sombre</Label>
                </div>
                <Switch id="dark-mode" />
              </div>

              <Separator />

              <div>
                <Label>Thème de couleur</Label>
                <div className="mt-2 flex gap-2">
                  {["purple", "blue", "green", "red", "orange"].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full ${
                        color === "purple"
                          ? "bg-purple-500"
                          : color === "blue"
                            ? "bg-blue-500"
                            : color === "green"
                              ? "bg-green-500"
                              : color === "red"
                                ? "bg-red-500"
                                : "bg-orange-500"
                      } ${color === "purple" ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                      aria-label={`Thème ${color}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Gérez vos préférences de notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications par email</p>
                  <p className="text-sm text-gray-500">Recevez des rappels par email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications push</p>
                  <p className="text-sm text-gray-500">Recevez des notifications dans l'application</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rappels de tâches</p>
                  <p className="text-sm text-gray-500">Recevez des rappels avant les tâches importantes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>IA & Automatisation</CardTitle>
              <CardDescription>Configurez les fonctionnalités d'IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Suggestions IA</p>
                  <p className="text-sm text-gray-500">Permettre à l'IA de suggérer des tâches</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Optimisation automatique</p>
                  <p className="text-sm text-gray-500">Optimiser automatiquement votre emploi du temps</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analyse des habitudes</p>
                  <p className="text-sm text-gray-500">Analyser vos habitudes pour améliorer les suggestions</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div>
                <Label htmlFor="ai-aggressiveness">Niveau d'intervention de l'IA</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Button variant="outline" className="bg-purple-50 text-purple-700">
                    Minimal
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-purple-100 text-purple-700 ring-2 ring-purple-500 ring-offset-2"
                  >
                    Équilibré
                  </Button>
                  <Button variant="outline">Proactif</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
