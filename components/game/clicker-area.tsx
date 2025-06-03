"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameState } from "@/types/game"
import { formatNumber } from "@/lib/game-utils"

interface ClickerAreaProps {
  gameState: GameState
  onClick: () => void
}

export function ClickerArea({ gameState, onClick }: ClickerAreaProps) {
  const [clickAnimation, setClickAnimation] = useState(false)

  const handleClick = () => {
    setClickAnimation(true)
    setTimeout(() => setClickAnimation(false), 200)
    onClick()
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader className="text-center">
        <CardTitle>Cliquez sur l'Aubergine!</CardTitle>
        <CardDescription className="text-white/80">
          {formatNumber(gameState.perClick * gameState.multiplier)} 💰 par clic
        </CardDescription>
        <CardDescription className="text-white/80">
          {formatNumber(gameState.perSecond * gameState.multiplier)} 💰 par seconde
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Button
          onClick={handleClick}
          size="lg"
          className={`w-48 h-48 text-8xl rounded-full bg-purple-500 hover:bg-purple-400 transition-all duration-200 ${
            clickAnimation ? 'scale-110' : 'scale-100'
          }`}
        >
          🍆
        </Button>
        
        {/* Power-ups Display */}
        {Object.entries(gameState.powerUps).map(([key, powerUp]) => {
          if (!powerUp.active) return null
          
          const names = {
            golden: "✨ Zeub Doré",
            frenzy: "🔥 Frénésie",
            clickFrenzy: "⚡ Frénésie de Clic"
          }
          
          return (
            <Badge key={key} variant="secondary" className="mt-2 animate-pulse">
              {names[key as keyof typeof names]} - {powerUp.timeLeft}s
            </Badge>
          )
        })}
      </CardContent>
    </Card>
  )
}