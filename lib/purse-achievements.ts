import { Achievement } from '@/types/game'

// Additional achievements for the flying purse system
export const PURSE_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_purse",
    name: "Chasseur de Bourses",
    description: "Capturer votre première bourse volante",
    condition: (state) => {
      return state.purseStats?.totalCaptured >= 1
    },
    emoji: "💰"
  },
  {
    id: "purse_master",
    name: "Maître des Bourses",
    description: "Capturer 50 bourses volantes",
    condition: (state) => {
      return state.purseStats?.totalCaptured >= 50
    },
    emoji: "🎯"
  },
  {
    id: "speed_catcher",
    name: "Attrapeur Rapide",
    description: "Capturer 5 bourses en moins de 30 secondes",
    condition: (state) => {
      return state.purseStats?.recentCaptures?.length >= 5
    },
    emoji: "⚡"
  },
  {
    id: "purse_millionaire",
    name: "Millionnaire des Bourses",
    description: "Gagner 1M de Zeubs grâce aux bourses",
    condition: (state) => {
      return state.purseStats?.totalEarned >= 1000000
    },
    emoji: "💎"
  }
]

// Helper function to merge with existing achievements
export function getAllAchievements(baseAchievements: Achievement[]): Achievement[] {
  return [...baseAchievements, ...PURSE_ACHIEVEMENTS]
}