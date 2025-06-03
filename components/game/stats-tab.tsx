"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GameState } from "@/types/game"
import { ACHIEVEMENTS } from "@/lib/game-data"
import { formatNumber } from "@/lib/game-utils"

interface StatsTabProps {
  gameState: GameState
}

export function StatsTab({ gameState }: StatsTabProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription className="text-white/80">
          Vos statistiques de jeu détaillées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-sm text-white/70">Argent Total Gagné</div>
              <div className="text-xl font-bold">{formatNumber(gameState.totalEarned)} 💰</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-sm text-white/70">Gains par Clic</div>
              <div className="text-xl font-bold">{formatNumber(gameState.perClick * gameState.multiplier)} 💰</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-sm text-white/70">Gains par Seconde</div>
              <div className="text-xl font-bold">{formatNumber(gameState.perSecond * gameState.multiplier)} 💰</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-sm text-white/70">Niveau Actuel</div>
              <div className="text-xl font-bold">Niveau {gameState.level}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-sm text-white/70">Multiplicateur</div>
              <div className="text-xl font-bold">×{gameState.multiplier.toFixed(1)}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-sm text-white/70">Succès Débloqués</div>
              <div className="text-xl font-bold">
                {Object.values(gameState.unlockedAchievements).filter(Boolean).length} / {ACHIEVEMENTS.length}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}