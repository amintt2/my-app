"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GameState } from "@/types/game"
import { STOCKS } from "@/lib/game-data"
import { formatNumber } from "@/lib/game-utils"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

interface StocksTabProps {
  gameState: GameState
  buyStock: (stockId: string, amount?: number) => void
  sellStock: (stockId: string, amount?: number) => void
}

export function StocksTab({ gameState, buyStock, sellStock }: StocksTabProps) {
  const [buyAmounts, setBuyAmounts] = useState<Record<string, string>>({})
  const [sellAmounts, setSellAmounts] = useState<Record<string, string>>({})

  const handleBuyAmountChange = (stockId: string, value: string) => {
    setBuyAmounts(prev => ({ ...prev, [stockId]: value }))
  }

  const handleSellAmountChange = (stockId: string, value: string) => {
    setSellAmounts(prev => ({ ...prev, [stockId]: value }))
  }

  const getBuyAmount = (stockId: string) => {
    const amount = parseInt(buyAmounts[stockId] || '1')
    return isNaN(amount) || amount < 1 ? 1 : amount
  }

  const getSellAmount = (stockId: string) => {
    const amount = parseInt(sellAmounts[stockId] || '1')
    return isNaN(amount) || amount < 1 ? 1 : amount
  }

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
              <motion.div 
                key={stock.id} 
                className="p-4 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.span 
                      className="text-2xl"
                      animate={{ rotate: current?.trend && current.trend > 0 ? [0, 10, -10, 0] : 0 }}
                      transition={{ repeat: current?.trend && current.trend > 0 ? Infinity : 0, repeatDelay: 2 }}
                    >
                      {stock.emoji}
                    </motion.span>
                    <div>
                      <div className="font-semibold">{stock.name}</div>
                      <div className={`text-sm ${trendColor}`}>
                        {formatNumber(current?.price || stock.basePrice)} 💰
                        {current?.trend && (
                          <motion.span 
                            className="ml-2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                          >
                            {current.trend > 0 ? '📈' : '📉'} {(current.trend * 100).toFixed(1)}%
                          </motion.span>
                        )}
                      </div>
                      <div className="text-sm text-white/70">Possédé: {current?.owned || 0}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        min="1"
                        value={buyAmounts[stock.id] || '1'}
                        onChange={(e) => handleBuyAmountChange(stock.id, e.target.value)}
                        className="w-20 h-8 text-sm bg-white/10 border-white/20 text-white"
                        placeholder="1"
                      />
                      <Button
                        onClick={() => buyStock(stock.id, getBuyAmount(stock.id))}
                        disabled={gameState.money < (current?.price || stock.basePrice) * getBuyAmount(stock.id)}
                        size="sm"
                        variant="default"
                        className="transition-transform hover:scale-105 active:scale-95"
                      >
                        Acheter
                      </Button>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        min="1"
                        max={current?.owned || 0}
                        value={sellAmounts[stock.id] || '1'}
                        onChange={(e) => handleSellAmountChange(stock.id, e.target.value)}
                        className="w-20 h-8 text-sm bg-white/10 border-white/20 text-white"
                        placeholder="1"
                      />
                      <Button
                        onClick={() => sellStock(stock.id, getSellAmount(stock.id))}
                        disabled={(current?.owned || 0) === 0 || getSellAmount(stock.id) > (current?.owned || 0)}
                        size="sm"
                        variant="outline"
                        className="transition-transform hover:scale-105 active:scale-95"
                      >
                        Vendre
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Stock Price Chart */}
                <div className="mt-4 h-32 w-full">
                  {current?.priceHistory && current.priceHistory.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={current.priceHistory.map((price, index) => ({ index, price }))}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <XAxis dataKey="index" hide={true} />
                        <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                        <Tooltip 
                          formatter={(value: number) => [`${formatNumber(value)} 💰`, 'Prix']}
                          labelFormatter={() => ''}
                          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#444' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={current.trend > 0 ? "#4ade80" : "#f87171"} 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          isAnimationActive={true}
                          animationDuration={500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/50">
                      Données insuffisantes pour le graphique
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}