"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameState } from "@/types/game"
import { ACHIEVEMENTS } from "@/lib/game-data"

interface AchievementsTabProps {
  gameState: GameState
}

export function AchievementsTab({ gameState }: AchievementsTabProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle>Succès</CardTitle>
        <CardDescription className="text-white/80">
          Débloquez des succès en atteignant certains objectifs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map(achievement => {
            const unlocked = gameState.achievements[achievement.id]
            
            return (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border transition-all ${
                  unlocked 
                    ? 'bg-yellow-500/20 border-yellow-400 shadow-lg shadow-yellow-400/20' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${unlocked ? 'grayscale-0' : 'grayscale'}`}>
                    {achievement.emoji}
                  </span>
                  <div>
                    <div className={`font-semibold ${unlocked ? 'text-yellow-300' : 'text-white'}`}>
                      {achievement.name}
                    </div>
                    <div className="text-sm text-white/70">
                      {achievement.description}
                    </div>
                    {unlocked && (
                      <Badge variant="secondary" className="mt-1 bg-yellow-500/20 text-yellow-300">
                        ✓ Débloqué
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}