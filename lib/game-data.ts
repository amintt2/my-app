import { Upgrade, Stock, Achievement } from '@/types/game'

export const UPGRADES: Upgrade[] = [
  { id: "cursor", name: "Curseur Magique", description: "+1 par clic", baseCost: 15, baseProduction: 0, emoji: "👆" },
  { id: "grandma", name: "Grand-mère Zeub", description: "+5 par seconde", baseCost: 100, baseProduction: 5, emoji: "👵" },
  { id: "farm", name: "Ferme à Zeub", description: "+25 par seconde", baseCost: 1100, baseProduction: 25, emoji: "🚜" },
  { id: "mine", name: "Mine de Zeub", description: "+100 par seconde", baseCost: 12000, baseProduction: 100, emoji: "⛏️" },
  { id: "factory", name: "Usine à Zeub", description: "+400 par seconde", baseCost: 130000, baseProduction: 400, emoji: "🏭" },
  { id: "bank", name: "Banque", description: "+1,600 par seconde", baseCost: 1400000, baseProduction: 1600, emoji: "🏦" },
  { id: "temple", name: "Temple", description: "+6,500 par seconde", baseCost: 20000000, baseProduction: 6500, emoji: "🏛️" },
  { id: "wizard", name: "Sorcier", description: "+26,000 par seconde", baseCost: 330000000, baseProduction: 26000, emoji: "🧙" },
  { id: "spaceship", name: "Vaisseau spatial", description: "+100,000 par seconde", baseCost: 5100000000, baseProduction: 100000, emoji: "🚀" },
  { id: "portal", name: "Portail", description: "+400,000 par seconde", baseCost: 75000000000, baseProduction: 400000, emoji: "🌀" }
]

export const STOCKS: Stock[] = [
  { id: "zeubcoin", name: "ZeubCoin", basePrice: 10, emoji: "🪙" },
  { id: "auberginecorp", name: "AubergineCorp", basePrice: 50, emoji: "🍆" },
  { id: "veggieindex", name: "VeggieIndex", basePrice: 100, emoji: "📈" }
]

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_click", name: "Premier clic", description: "Effectuer le premier clic", condition: (state) => state.totalEarned > 0, emoji: "👆" },
  { id: "millionaire", name: "Millionnaire", description: "Gagner 1M au total", condition: (state) => state.totalEarned >= 1000000, emoji: "💰" },
  { id: "level_10", name: "Niveau 10", description: "Atteindre le niveau 10", condition: (state) => state.level >= 10, emoji: "🔟" },
  { id: "investor", name: "Investisseur", description: "Faire son premier investissement", condition: (state) => Object.values(state.stockMarket).some(stock => stock.owned > 0), emoji: "📊" }
]