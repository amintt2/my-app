"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GameHeader } from "@/components/game/game-header"
import { ClickerArea } from "@/components/game/clicker-area"
import { UpgradesTab } from "@/components/game/upgrades-tab"
import { StocksTab } from "@/components/game/stocks-tab"
import { AchievementsTab } from "@/components/game/achievements-tab"
import { StatsTab } from "@/components/game/stats-tab"
import { Notifications } from "@/components/game/notifications"
import { useGameState } from "@/hooks/use-game-state"

export default function ZeubClicker() {
  const {
    gameState,
    notifications,
    handleClick,
    buyUpgrade,
    buyStock,
    sellStock
  } = useGameState()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-4">
      <div className="container mx-auto max-w-7xl">
        <GameHeader gameState={gameState} />
        <Notifications notifications={notifications} />

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Clicker */}
          <div className="lg:col-span-1">
            <ClickerArea gameState={gameState} onClick={handleClick} />
          </div>

          {/* Right Columns - Game Features */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upgrades" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md">
                <TabsTrigger value="upgrades" className="text-white data-[state=active]:bg-white/20">
                  Améliorations
                </TabsTrigger>
                <TabsTrigger value="stocks" className="text-white data-[state=active]:bg-white/20">
                  Bourse
                </TabsTrigger>
                <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-white/20">
                  Succès
                </TabsTrigger>
                <TabsTrigger value="stats" className="text-white data-[state=active]:bg-white/20">
                  Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upgrades">
                <UpgradesTab gameState={gameState} buyUpgrade={buyUpgrade} />
              </TabsContent>

              <TabsContent value="stocks">
                <StocksTab gameState={gameState} buyStock={buyStock} sellStock={sellStock} />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementsTab gameState={gameState} />
              </TabsContent>

              <TabsContent value="stats">
                <StatsTab gameState={gameState} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
