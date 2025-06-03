"use client"

import { useState, useEffect, useCallback } from "react"
import { GameState } from "@/types/game"
import { UPGRADES, STOCKS, ACHIEVEMENTS } from "@/lib/game-data"
import { getInitialGameState } from "@/lib/game-utils"
import { 
  saveGameToCookie, 
  loadGameFromCookie, 
  loadNotificationSettings,
  NotificationSettings 
} from "@/lib/cookie-utils"

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState())
  const [notifications, setNotifications] = useState<string[]>([])
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(loadNotificationSettings())

  // Initialize game state
  useEffect(() => {
    const saved = loadGameFromCookie()
    if (saved) {
      setGameState(saved)
    }
    // Load notification settings
    setNotificationSettings(loadNotificationSettings())
  }, [])

  // Auto-save every 10 seconds to cookies
  useEffect(() => {
    const interval = setInterval(() => {
      saveGameToCookie(gameState)
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
          const powerUp = newPowerUps[key as keyof typeof newPowerUps]
          if (powerUp.active && powerUp.timeLeft > 0) {
            powerUp.timeLeft -= 1000
            if (powerUp.timeLeft <= 0) {
              powerUp.active = false
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
          const newPrice = newStockMarket[stockId].price * (1 + change)
          
          // Prevent prices from going too low
          const basePrice = STOCKS.find(s => s.id === stockId)?.basePrice || 10
          const finalPrice = Math.max(newPrice, basePrice * 0.1)
          
          newStockMarket[stockId].price = finalPrice
          newStockMarket[stockId].trend = change
          
          // Update price history (keep last 20 points)
          const history = [...(newStockMarket[stockId].priceHistory || [])]
          history.push(finalPrice)
          if (history.length > 20) {
            history.shift()
          }
          newStockMarket[stockId].priceHistory = history
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
      if (!gameState.unlockedAchievements[achievement.id] && achievement.condition(gameState)) {
        setGameState(prev => ({
          ...prev,
          unlockedAchievements: {
             ...prev.unlockedAchievements,
             [achievement.id]: true
          }
        }))
        addNotification(`🏆 Succès débloqué: ${achievement.name}!`, 'achievements')
      }
    })
  }, [gameState.money, gameState.totalEarned, gameState.level, gameState.stockMarket])

  const addNotification = useCallback((message: string, type: keyof NotificationSettings = 'enabled') => {
    // Check if notifications are enabled for this type
    if (!notificationSettings.enabled || !notificationSettings[type]) {
      return
    }
    
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 3000)
  }, [notificationSettings])

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
        addNotification("✨ Zeub Doré activé! +500% gains pendant 10s", 'powerUps')
        
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
        
        // Special handling for cursor upgrade - affects perClick instead of perSecond
        if (upgradeId === 'cursor') {
          return {
            ...prev,
            money: prev.money - currentUpgrade.cost,
            perClick: prev.perClick + 1,
            upgrades: newUpgrades
          }
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

  const resetGame = useCallback(() => {
    setGameState(getInitialGameState())
    setNotifications([])
  }, [])

  const loadSpecificGame = useCallback((savedGameState: GameState) => {
    setGameState(savedGameState)
    setNotifications([])
  }, [])

  return {
    gameState,
    notifications,
    notificationSettings,
    handleClick,
    buyUpgrade,
    buyStock,
    sellStock,
    resetGame,
    loadSpecificGame
  }
}