import { GameState } from '@/types/game'
import { UPGRADES, STOCKS } from './game-data'

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
    localStorage.setItem('zeubClickerSave', JSON.stringify(state))
  }
}

export const loadGame = (): GameState | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('zeubClickerSave')
    return saved ? JSON.parse(saved) : null
  }
  return null
}

export const getInitialGameState = (): GameState => {
  // Initialize upgrades
  const initialUpgrades: { [key: string]: { count: number; cost: number } } = {}
  UPGRADES.forEach(upgrade => {
    initialUpgrades[upgrade.id] = { count: 0, cost: upgrade.baseCost }
  })
  
  // Initialize stocks
  const initialStocks: { [key: string]: { price: number; owned: number; trend: number } } = {}
  STOCKS.forEach(stock => {
    initialStocks[stock.id] = { price: stock.basePrice, owned: 0, trend: 0 }
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
    upgrades: initialUpgrades,
    stockMarket: initialStocks,
    powerUps: {
      golden: { active: false, timeLeft: 0 },
      frenzy: { active: false, timeLeft: 0 },
      clickFrenzy: { active: false, timeLeft: 0 }
    },
    achievements: {}
  }
}