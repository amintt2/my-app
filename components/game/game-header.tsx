"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GameState } from "@/types/game"
import { formatNumber } from "@/lib/game-utils"

interface GameHeaderProps {
  gameState: GameState
}

export function GameHeader({ gameState }: GameHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">🍆 Zeub Clicker</h1>
      <div className="flex justify-center items-center gap-4 text-white">
        <div className="text-2xl font-bold">{formatNumber(gameState.money)} 💰</div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Niveau {gameState.level}
        </Badge>
      </div>
      <div className="mt-2 max-w-md mx-auto">
        <Progress 
          value={(gameState.experience / gameState.experienceToNext) * 100} 
          className="h-3"
        />
        <div className="text-sm text-white/80 mt-1">
          XP: {formatNumber(gameState.experience)} / {formatNumber(gameState.experienceToNext)}
        </div>
      </div>
    </div>
  )
}