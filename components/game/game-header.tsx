"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GameState } from "@/types/game"
import { formatNumber } from "@/lib/game-utils"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GameHeaderProps {
  gameState: GameState
}

export function GameHeader({ gameState }: GameHeaderProps) {
  const [prevMoney, setPrevMoney] = useState(gameState.money)
  const [moneyDiff, setMoneyDiff] = useState(0)
  const [showMoneyAnimation, setShowMoneyAnimation] = useState(false)
  
  // Track money changes for animation
  useEffect(() => {
    if (gameState.money !== prevMoney) {
      setMoneyDiff(gameState.money - prevMoney)
      setShowMoneyAnimation(true)
      
      const timer = setTimeout(() => {
        setShowMoneyAnimation(false)
      }, 1000)
      
      setPrevMoney(gameState.money)
      return () => clearTimeout(timer)
    }
  }, [gameState.money, prevMoney])
  
  // Calculate progress percentage correctly
  const progressPercentage = Math.min(
    (gameState.experience / gameState.experienceToNext) * 100,
    100
  )
  
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        🍆 Zeub Clicker
      </h1>
      
      <div className="flex justify-center items-center gap-4 text-white">
        <div className="text-2xl font-bold relative">
          <motion.div
            key={gameState.money}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {formatNumber(gameState.money)} 💰
          </motion.div>
          
          <AnimatePresence>
            {showMoneyAnimation && moneyDiff > 0 && (
              <motion.div 
                className="absolute -top-6 right-0 text-green-400 text-sm font-bold"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                +{formatNumber(moneyDiff)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Badge variant="secondary" className="text-lg px-3 py-1">
            Niveau {gameState.level}
          </Badge>
        </motion.div>
      </div>
      
      <div className="mt-4 max-w-md mx-auto">
        <div className="text-sm text-white/80 mb-2">
          XP: {formatNumber(gameState.experience)} / {formatNumber(gameState.experienceToNext)}
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-white/20"
        />
      </div>
    </div>
  )
}