"use client"

import { useState } from "react"
import {
  Users,
  ShoppingCart,
  MessageSquare,
  Crown,
  Target,
  ExternalLink,
  TrendingUp,
  Activity,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function MainDashboard() {
  const [onlinePlayers] = useState(123)
  const maxPlayers = 200

  return (
    <div className="flex-1 space-y-6 p-6 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Top Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Joueurs en ligne</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {onlinePlayers}/{maxPlayers}
            </div>
            <Progress value={(onlinePlayers / maxPlayers) * 100} className="mt-2 h-2" />
            <p className="text-xs text-green-400 mt-1">+12% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Le plus riche</CardTitle>
            <Crown className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Draogor</div>
            <p className="text-xs text-yellow-400">110,155,810 pièces d'or</p>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-pink-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Most Wanted</CardTitle>
            <Target className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Jashin</div>
            <p className="text-xs text-red-400">Prime: 42,500,000</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-violet-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Activité</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Élevée</div>
            <p className="text-xs text-purple-400">+23% d'activité</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hero Section - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden border-blue-500/20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 h-80">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
            <CardContent className="relative h-full flex flex-col justify-center p-8">
              <Badge className="w-fit mb-4 bg-red-500 text-white border-red-400 hover:bg-red-600">WANTED</Badge>
              <h1 className="text-4xl font-bold text-white mb-4">Nouveaux Aventuriers Recherchés</h1>
              <p className="text-xl text-blue-100 mb-6 max-w-md">
                De nouveaux aventuriers bien équipés... Peut-être que la boutique a ce qu'il te faut ?
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Boutique Tebex
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <a href="https://discord.gg/cbQbt6jHTS" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Discord
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media & Quick Actions */}
        <div className="space-y-4">
          <Card className="border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href="https://discord.gg/cbQbt6jHTS" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Rejoindre Discord
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" title="TikTok">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v5.73a3.87 3.87 0 0 1-3.87 3.87h-.01a3.87 3.87 0 0 1-3.87-3.87V2H4.07v5.73a3.87 3.87 0 0 1-3.87 3.87H0v1.4h.2a5.27 5.27 0 0 0 5.27-5.27V2.4h1.33v5.33a5.27 5.27 0 0 0 5.27 5.27h.01a5.27 5.27 0 0 0 5.27-5.27V2.4h1.33v5.33a5.27 5.27 0 0 0 5.27 5.27h.2V12h-.2a3.87 3.87 0 0 1-3.87-3.87V2.4h-1.33v5.33a3.87 3.87 0 0 1-3.87 3.87z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" title="Twitter">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" title="YouTube">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-foreground">Serveur Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Serveur Principal</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Latence</span>
                  <span className="text-sm text-foreground">23ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm text-foreground">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support Tickets Section */}
      <Card className="border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Support & Tickets</CardTitle>
              <CardDescription>Besoin d'aide ? Créez un ticket sur Discord</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
              Voir tous les tickets
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-400 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Problème Technique
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-4">
                  Contactez notre support pour obtenir de l'aide par rapport à un souci technique.
                </p>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <a href="https://discord.gg/cbQbt6jHTS" target="_blank" rel="noopener noreferrer">
                    Ouvrir un ticket
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Partenariat Streamer
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-4">
                  Vous êtes streamer ? Contactez-nous pour discuter d'un partenariat.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50"
                  asChild
                >
                  <a href="https://discord.gg/cbQbt6jHTS" target="_blank" rel="noopener noreferrer">
                    Ouvrir un ticket
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-500/5 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-red-400 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Demande de déban
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-4">
                  Vous avez été banni ? Soumettez une demande de déban.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                  asChild
                >
                  <a href="https://discord.gg/cbQbt6jHTS" target="_blank" rel="noopener noreferrer">
                    Ouvrir un ticket
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
