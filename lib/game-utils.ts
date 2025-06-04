import { GameState, Upgrade, Stock, Achievement } from '@/types/game'
import { UPGRADES, STOCKS, ACHIEVEMENTS } from './game-data'
import { saveGameToCookie, loadGameFromCookie } from './cookie-utils'

// Utility functions
export const formatNumber = (num: number): string => {
  if (num < 1000) return Math.floor(num).toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + "K"
  if (num < 1000000000) return (num / 1000000).toFixed(1) + "M"
  if (num < 1000000000000) return (num / 1000000000).toFixed(1) + "B"
  return (num / 1000000000000).toFixed(1) + "T"
}

export const saveGame = (state: GameState) => {
  if (typeof window !== 'undefined') {
    saveGameToCookie(state)
  }
}

export const loadGame = (): GameState | null => {
  if (typeof window !== 'undefined') {
    return loadGameFromCookie()
  }
  return null
}

export function getInitialGameState(): GameState {
  const initialUpgrades: { [key: string]: { count: number; cost: number } } = {}
  UPGRADES.forEach(upgrade => {
    initialUpgrades[upgrade.id] = { count: 0, cost: upgrade.baseCost }
  })

  const initialStockMarket: { [key: string]: { price: number; owned: number; trend: number; priceHistory: number[] } } = {}
  STOCKS.forEach(stock => {
    initialStockMarket[stock.id] = { 
      price: stock.basePrice, 
      owned: 0, 
      trend: 0,
      priceHistory: [stock.basePrice]
    }
  })

  const initialAchievements: { [key: string]: boolean } = {}
  ACHIEVEMENTS.forEach(achievement => {
    initialAchievements[achievement.id] = false
  })

  return {
    money: 0,
    totalEarned: 0,
    perClick: 1,
    perSecond: 0,
    level: 1,
    experience: 0,
    experienceToNext: 100,
    multiplier: 1.0,
    startTime: Date.now(),
    upgrades: initialUpgrades,
    stockMarket: initialStockMarket,
    powerUps: {
      golden: { active: false, timeLeft: 0 },
      frenzy: { active: false, timeLeft: 0 },
      clickFrenzy: { active: false, timeLeft: 0 }
    },
    unlockedAchievements: initialAchievements,
    purseStats: {
      totalCaptured: 0,
      totalEarned: 0,
      lastCaptureTime: 0,
      recentCaptures: []
    }
  }
}