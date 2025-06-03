"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { GameHeader } from "@/components/game/game-header"
import { ClickerArea } from "@/components/game/clicker-area"
import { UpgradesTab } from "@/components/game/upgrades-tab"
import { StocksTab } from "@/components/game/stocks-tab"
import { AchievementsTab } from "@/components/game/achievements-tab"
import { StatsTab } from "@/components/game/stats-tab"
import { Notifications } from "@/components/game/notifications"
import { useGameState } from "@/hooks/use-game-state"
import SettingsPage from '@/components/game/settings-page'

export default function ZeubClicker() {
  const {
    gameState,
    notifications,
    handleClick,
    buyUpgrade,
    buyStock,
    sellStock,
    resetGame
  } = useGameState()
  
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <GameHeader gameState={gameState} />
          </div>
          <Button 
            onClick={() => setShowSettings(true)}
            variant="outline"
            size="sm"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          >
            ⚙️ Paramètres
          </Button>
        </div>
        
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
        
        {/* Settings Modal */}
        {showSettings && (
          <SettingsPage 
            gameState={gameState}
            onClose={() => setShowSettings(false)}
            onResetGame={resetGame}
          />
        )}
      </div>
    </div>
  )
}
