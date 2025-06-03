// Game Types
export interface GameState {
  money: number
  totalEarned: number
  perClick: number
  perSecond: number
  level: number
  experience: number
  experienceToNext: number
  multiplier: number
  startTime: number
  upgrades: { [key: string]: { count: number; cost: number } }
  stockMarket: { [key: string]: { price: number; owned: number; trend: number; priceHistory: number[] } }
  powerUps: {
    golden: { active: boolean; timeLeft: number }
    frenzy: { active: boolean; timeLeft: number }
    clickFrenzy: { active: boolean; timeLeft: number }
  }
  unlockedAchievements: { [key: string]: boolean }
}

export interface Upgrade {
  id: string
  name: string
  description: string
  baseCost: number
  baseProduction: number
  emoji: string
}

export interface Stock {
  id: string
  name: string
  basePrice: number
  emoji: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  condition: (state: GameState) => boolean
  emoji: string
}