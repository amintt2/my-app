'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { loadGameFromCookie, deleteCookie } from '@/lib/cookie-utils'
import { GameState } from '@/types/game'
import { formatNumber } from '@/lib/game-utils'
import { motion } from 'framer-motion'

interface SaveSelectionPageProps {
  onLoadGame: (gameState: GameState) => void
  onNewGame: () => void
}

export default function SaveSelectionPage({ onLoadGame, onNewGame }: SaveSelectionPageProps) {
  const [savedGame, setSavedGame] = useState<GameState | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const saved = loadGameFromCookie()
    setSavedGame(saved)
  }, [])

  const handleLoadGame = () => {
    if (savedGame) {
      onLoadGame(savedGame)
    }
  }

  const handleNewGame = () => {
    onNewGame()
  }

  const handleDeleteSave = () => {
    if (showDeleteConfirm) {
      deleteCookie('zeub-clicker-save')
      setSavedGame(null)
      setShowDeleteConfirm(false)
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 5000)
    }
  }

  const getPlayTime = (startTime: number) => {
    const now = Date.now()
    const diff = now - startTime
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="text-center">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              🍆
            </motion.div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Zeub Clicker
            </CardTitle>
            <CardDescription className="text-white/80 text-lg">
              Bienvenue dans l'univers du clic infini !
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {savedGame ? (
              <>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">Sauvegarde trouvée</h3>
                  
                  <motion.div 
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-white/70">Argent</div>
                        <div className="text-lg font-bold text-green-400">
                          {formatNumber(savedGame.money)} 💰
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Niveau</div>
                        <div className="text-lg font-bold text-blue-400">
                          {savedGame.level}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Total gagné</div>
                        <div className="text-lg font-bold text-purple-400">
                          {formatNumber(savedGame.totalEarned)} 💰
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Temps de jeu</div>
                        <div className="text-lg font-bold text-yellow-400">
                          {getPlayTime(savedGame.startTime)}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-white/20" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-white/70">Gains/clic</div>
                        <div className="text-md font-semibold">
                          {formatNumber(savedGame.perClick * savedGame.multiplier)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Gains/seconde</div>
                        <div className="text-md font-semibold">
                          {formatNumber(savedGame.perSecond * savedGame.multiplier)}
                        </div>
                      </div>
                    </div>
                    
                    {Object.values(savedGame.unlockedAchievements).some(Boolean) && (
                      <div className="mt-4">
                        <div className="text-sm text-white/70 mb-2">Succès débloqués</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(savedGame.unlockedAchievements)
                            .filter(([_, unlocked]) => unlocked)
                            .map(([id, _]) => (
                              <Badge key={id} variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                                🏆
                              </Badge>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handleLoadGame}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    🎮 Continuer la partie
                  </Button>
                  
                  <Button 
                    onClick={handleNewGame}
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    ✨ Nouvelle partie
                  </Button>
                  
                  <Button 
                    onClick={handleDeleteSave}
                    size="sm"
                    variant="destructive"
                    className="w-full mt-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 transition-all duration-300"
                  >
                    {showDeleteConfirm ? '⚠️ Confirmer la suppression' : '🗑️ Supprimer la sauvegarde'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Alert className="bg-blue-500/20 border-blue-500/50">
                  <AlertDescription className="text-blue-200">
                    Aucune sauvegarde trouvée. Commencez une nouvelle aventure !
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={handleNewGame}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-105"
                >
                  🚀 Commencer l'aventure
                </Button>
              </>
            )}
            
            <div className="text-center text-white/60 text-sm mt-6">
              <p>Votre progression est automatiquement sauvegardée toutes les 10 secondes</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}