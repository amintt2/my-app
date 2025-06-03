"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GameState } from "@/types/game"
import { UPGRADES } from "@/lib/game-data"
import { formatNumber } from "@/lib/game-utils"

interface UpgradesTabProps {
  gameState: GameState
  buyUpgrade: (upgradeId: string) => void
}

export function UpgradesTab({ gameState, buyUpgrade }: UpgradesTabProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle>Améliorations</CardTitle>
        <CardDescription className="text-white/80">
          Achetez des améliorations pour augmenter vos gains automatiques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {UPGRADES.map(upgrade => {
              const current = gameState.upgrades[upgrade.id]
              const canAfford = gameState.money >= current?.cost
              
              return (
                <div key={upgrade.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{upgrade.emoji}</span>
                    <div>
                      <div className="font-semibold">{upgrade.name}</div>
                      <div className="text-sm text-white/70">{upgrade.description}</div>
                      <div className="text-sm text-white/70">Possédé: {current?.count || 0}</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => buyUpgrade(upgrade.id)}
                    disabled={!canAfford}
                    variant={canAfford ? "default" : "secondary"}
                    size="sm"
                  >
                    {formatNumber(current?.cost || upgrade.baseCost)} 💰
                  </Button>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}