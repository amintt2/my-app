"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GameState } from "@/types/game"
import { STOCKS } from "@/lib/game-data"
import { formatNumber } from "@/lib/game-utils"

interface StocksTabProps {
  gameState: GameState
  buyStock: (stockId: string, amount?: number) => void
  sellStock: (stockId: string, amount?: number) => void
}

export function StocksTab({ gameState, buyStock, sellStock }: StocksTabProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle>Marché Boursier</CardTitle>
        <CardDescription className="text-white/80">
          Investissez dans des actions pour diversifier vos revenus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {STOCKS.map(stock => {
            const current = gameState.stockMarket[stock.id]
            const trendColor = current?.trend > 0 ? 'text-green-400' : current?.trend < 0 ? 'text-red-400' : 'text-white'
            
            return (
              <div key={stock.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stock.emoji}</span>
                    <div>
                      <div className="font-semibold">{stock.name}</div>
                      <div className={`text-sm ${trendColor}`}>
                        {formatNumber(current?.price || stock.basePrice)} 💰
                        {current?.trend && (
                          <span className="ml-2">
                            {current.trend > 0 ? '📈' : '📉'} {(current.trend * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/70">Possédé: {current?.owned || 0}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => buyStock(stock.id)}
                      disabled={gameState.money < (current?.price || stock.basePrice)}
                      size="sm"
                      variant="default"
                    >
                      Acheter
                    </Button>
                    <Button
                      onClick={() => sellStock(stock.id)}
                      disabled={(current?.owned || 0) === 0}
                      size="sm"
                      variant="outline"
                    >
                      Vendre
                    </Button>
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