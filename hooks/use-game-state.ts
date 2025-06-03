"use client"

import { useState, useEffect, useCallback } from "react"
import { GameState } from "@/types/game"
import { UPGRADES, STOCKS, ACHIEVEMENTS } from "@/lib/game-data"
import { saveGame, loadGame, getInitialGameState } from "@/lib/game-utils"

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState())
  const [notifications, setNotifications] = useState<string[]>([])

  // Initialize game state
  useEffect(() => {
    const saved = loadGame()
    if (saved) {
      setGameState(saved)
    }
  }, [])

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame(gameState)
    }, 10000)
    return () => clearInterval(interval)
  }, [gameState])

  // Passive income
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const income = prev.perSecond * prev.multiplier
        const newMoney = prev.money + income
        const newTotalEarned = prev.totalEarned + income
        
        return {
          ...prev,
          money: newMoney,
          totalEarned: newTotalEarned
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Power-ups timer
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const newPowerUps = { ...prev.powerUps }
        let multiplierChanged = false
        
        Object.keys(newPowerUps).forEach(key => {
          if (newPowerUps[key].active && newPowerUps[key].timeLeft > 0) {
            newPowerUps[key].timeLeft -= 1
            if (newPowerUps[key].timeLeft <= 0) {
              newPowerUps[key].active = false
              multiplierChanged = true
            }
          }
        })
        
        let newMultiplier = 1.0 + (prev.level - 1) * 0.1
        if (newPowerUps.golden.active) newMultiplier *= 6
        if (newPowerUps.frenzy.active) newMultiplier *= 3
        
        return {
          ...prev,
          powerUps: newPowerUps,
          multiplier: newMultiplier
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Stock market fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const newStockMarket = { ...prev.stockMarket }
        
        Object.keys(newStockMarket).forEach(stockId => {
          const change = (Math.random() - 0.5) * 0.2
          newStockMarket[stockId].price *= (1 + change)
          newStockMarket[stockId].trend = change
          
          // Prevent prices from going too low
          const basePrice = STOCKS.find(s => s.id === stockId)?.basePrice || 10
          if (newStockMarket[stockId].price < basePrice * 0.1) {
            newStockMarket[stockId].price = basePrice * 0.1
          }
        })
        
        return {
          ...prev,
          stockMarket: newStockMarket
        }
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Check achievements
  useEffect(() => {
    ACHIEVEMENTS.forEach(achievement => {
      if (!gameState.achievements[achievement.id] && achievement.condition(gameState)) {
        setGameState(prev => ({
          ...prev,
          achievements: {
            ...prev.achievements,
            [achievement.id]: true
          }
        }))
        addNotification(`🏆 Succès débloqué: ${achievement.name}!`)
      }
    })
  }, [gameState.money, gameState.totalEarned, gameState.level, gameState.stockMarket])

  const addNotification = useCallback((message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 3000)
  }, [])

  const handleClick = useCallback(() => {
    let clickValue = gameState.perClick
    if (gameState.powerUps.clickFrenzy.active) clickValue *= 11
    
    const finalValue = clickValue * gameState.multiplier
    
    setGameState(prev => {
      const newMoney = prev.money + finalValue
      const newTotalEarned = prev.totalEarned + finalValue
      const newExperience = prev.experience + Math.floor(finalValue / 10)
      
      let newLevel = prev.level
      let newExperienceToNext = prev.experienceToNext
      let experienceLeft = newExperience
      
      while (experienceLeft >= newExperienceToNext) {
        experienceLeft -= newExperienceToNext
        newLevel++
        newExperienceToNext = Math.floor(100 * Math.pow(1.5, newLevel - 1))
      }
      
      // Random power-up chance
      if (Math.random() < 0.01 && !prev.powerUps.golden.active) {
        const newPowerUps = { ...prev.powerUps }
        newPowerUps.golden = { active: true, timeLeft: 10 }
        addNotification("✨ Zeub Doré activé! +500% gains pendant 10s")
        
        return {
          ...prev,
          money: newMoney,
          totalEarned: newTotalEarned,
          experience: experienceLeft,
          experienceToNext: newExperienceToNext,
          level: newLevel,
          powerUps: newPowerUps,
          multiplier: (1.0 + (newLevel - 1) * 0.1) * 6
        }
      }
      
      return {
        ...prev,
        money: newMoney,
        totalEarned: newTotalEarned,
        experience: experienceLeft,
        experienceToNext: newExperienceToNext,
        level: newLevel,
        multiplier: 1.0 + (newLevel - 1) * 0.1
      }
    })
  }, [gameState.perClick, gameState.multiplier, gameState.powerUps.clickFrenzy.active, gameState.powerUps.golden.active, addNotification])

  const buyUpgrade = useCallback((upgradeId: string) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId)
    if (!upgrade) return
    
    const currentUpgrade = gameState.upgrades[upgradeId]
    if (gameState.money >= currentUpgrade.cost) {
      setGameState(prev => {
        const newUpgrades = { ...prev.upgrades }
        newUpgrades[upgradeId] = {
          count: currentUpgrade.count + 1,
          cost: Math.floor(currentUpgrade.cost * 1.15)
        }
        
        return {
          ...prev,
          money: prev.money - currentUpgrade.cost,
          perSecond: prev.perSecond + upgrade.baseProduction,
          upgrades: newUpgrades
        }
      })
    }
  }, [gameState.money, gameState.upgrades])

  const buyStock = useCallback((stockId: string, amount: number = 1) => {
    const stock = gameState.stockMarket[stockId]
    const totalCost = stock.price * amount
    
    if (gameState.money >= totalCost) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - totalCost,
        stockMarket: {
          ...prev.stockMarket,
          [stockId]: {
            ...stock,
            owned: stock.owned + amount
          }
        }
      }))
    }
  }, [gameState.money, gameState.stockMarket])

  const sellStock = useCallback((stockId: string, amount: number = 1) => {
    const stock = gameState.stockMarket[stockId]
    if (stock.owned >= amount) {
      const totalValue = stock.price * amount
      
      setGameState(prev => ({
        ...prev,
        money: prev.money + totalValue,
        stockMarket: {
          ...prev.stockMarket,
          [stockId]: {
            ...stock,
            owned: stock.owned - amount
          }
        }
      }))
    }
  }, [gameState.stockMarket])

  return {
    gameState,
    notifications,
    handleClick,
    buyUpgrade,
    buyStock,
    sellStock
  }
}