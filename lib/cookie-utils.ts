import { GameState } from '@/types/game'

// Cookie utility functions for game data persistence
export const setCookie = (name: string, value: string, days: number = 30) => {
  // Check if running in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export const getCookie = (name: string): string | null => {
  // Check if running in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') return null
  
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const deleteCookie = (name: string) => {
  // Check if running in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// Game-specific cookie functions
export const saveGameToCookie = (gameState: GameState) => {
  try {
    const gameData = JSON.stringify(gameState)
    setCookie('zeub-clicker-save', gameData, 365) // Save for 1 year
    return true
  } catch (error) {
    console.error('Failed to save game to cookie:', error)
    return false
  }
}

export const loadGameFromCookie = (): GameState | null => {
  try {
    const gameData = getCookie('zeub-clicker-save')
    if (gameData) {
      return JSON.parse(gameData)
    }
    return null
  } catch (error) {
    console.error('Failed to load game from cookie:', error)
    return null
  }
}

// Settings-specific cookie functions
export interface NotificationSettings {
  enabled: boolean
  achievements: boolean
  levelUp: boolean
  powerUps: boolean
  stocks: boolean
}

export const defaultNotificationSettings: NotificationSettings = {
  enabled: true,
  achievements: true,
  levelUp: true,
  powerUps: true,
  stocks: true
}

export const saveNotificationSettings = (settings: NotificationSettings) => {
  try {
    const settingsData = JSON.stringify(settings)
    setCookie('zeub-clicker-notifications', settingsData, 365)
    return true
  } catch (error) {
    console.error('Failed to save notification settings:', error)
    return false
  }
}

export const loadNotificationSettings = (): NotificationSettings => {
  try {
    const settingsData = getCookie('zeub-clicker-notifications')
    if (settingsData) {
      return { ...defaultNotificationSettings, ...JSON.parse(settingsData) }
    }
    return defaultNotificationSettings
  } catch (error) {
    console.error('Failed to load notification settings:', error)
    return defaultNotificationSettings
  }
}