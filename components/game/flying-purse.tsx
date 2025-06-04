"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GameState } from "@/types/game"
import { formatNumber } from "@/lib/game-utils"

interface FlyingPurse {
  id: string
  x: number
  y: number
  targetX: number
  targetY: number
  value: number
  captured: boolean
  startTime: number
}

interface PurseSettings {
  enabled: boolean
  spawnRate: number
  difficulty: number
}

interface FlyingPurseProps {
  gameState: GameState
  onPurseCapture: (value: number) => void
  isActive: boolean
  settings?: PurseSettings
}

export function FlyingPurse({ gameState, onPurseCapture, isActive, settings = { enabled: true, spawnRate: 50, difficulty: 100 } }: FlyingPurseProps) {
  const [purses, setPurses] = useState<FlyingPurse[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const purseIdCounter = useRef(0)

  // Calculate purse value based on XP level
  const calculatePurseValue = () => {
    const baseValue = gameState.perClick * gameState.multiplier * 10
    const levelMultiplier = 1 + (gameState.level - 1) * 0.2
    const randomMultiplier = 0.5 + Math.random() * 1.5 // 0.5x to 2x variation
    return Math.floor(baseValue * levelMultiplier * randomMultiplier)
  }

  // Spawn new purse
  const spawnPurse = () => {
    if (!containerRef.current || !isActive || !settings.enabled) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    
    // Random spawn position (from edges)
    const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
    let startX, startY, targetX, targetY

    switch (side) {
      case 0: // Top
        startX = Math.random() * containerRect.width
        startY = -50
        targetX = Math.random() * containerRect.width
        targetY = containerRect.height + 50
        break
      case 1: // Right
        startX = containerRect.width + 50
        startY = Math.random() * containerRect.height
        targetX = -50
        targetY = Math.random() * containerRect.height
        break
      case 2: // Bottom
        startX = Math.random() * containerRect.width
        startY = containerRect.height + 50
        targetX = Math.random() * containerRect.width
        targetY = -50
        break
      default: // Left
        startX = -50
        startY = Math.random() * containerRect.height
        targetX = containerRect.width + 50
        targetY = Math.random() * containerRect.height
        break
    }

    const newPurse: FlyingPurse = {
      id: `purse-${purseIdCounter.current++}`,
      x: startX,
      y: startY,
      targetX,
      targetY,
      value: calculatePurseValue(),
      captured: false,
      startTime: Date.now()
    }

    setPurses(prev => [...prev, newPurse])
  }

  // Handle purse click
  const handlePurseClick = (purseId: string) => {
    setPurses(prev => 
      prev.map(purse => 
        purse.id === purseId 
          ? { ...purse, captured: true }
          : purse
      )
    )

    const purse = purses.find(p => p.id === purseId)
    if (purse) {
      onPurseCapture(purse.value)
    }
  }

  // Clean up captured or expired purses
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now()
      setPurses(prev => 
        prev.filter(purse => 
          !purse.captured && (now - purse.startTime) < 8000 // 8 seconds lifespan
        )
      )
    }, 1000)

    return () => clearInterval(cleanup)
  }, [])

  // Spawn purses periodically
  useEffect(() => {
    if (!isActive || !(settings?.enabled ?? true)) return

    const spawnRate = settings?.spawnRate ?? 50
    const spawnInterval = setInterval(() => {
      // Spawn rate based on settings and level
      const baseSpawnChance = spawnRate / 100
      const levelBonus = (gameState.level - 1) * 0.02
      const spawnChance = Math.min(baseSpawnChance + levelBonus, 0.9)
      
      if (Math.random() < spawnChance && purses.length < 3) {
        spawnPurse()
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(spawnInterval)
  }, [isActive, settings?.enabled, settings?.spawnRate, gameState.level, purses.length])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      <AnimatePresence>
        {purses.map(purse => (
          <motion.div
            key={purse.id}
            initial={{ x: purse.x, y: purse.y, scale: 0, opacity: 0 }}
            animate={{ 
              x: purse.captured ? purse.x : purse.targetX,
              y: purse.captured ? purse.y : purse.targetY,
              scale: purse.captured ? 0 : 1,
              opacity: purse.captured ? 0 : 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: purse.captured ? 0.3 : (6 * (100 / (settings?.difficulty ?? 50))),
              ease: purse.captured ? "easeOut" : "linear"
            }}
            className="absolute pointer-events-auto cursor-pointer"
            onClick={() => handlePurseClick(purse.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              {/* Purse emoji with glow effect */}
              <div className="text-4xl filter drop-shadow-lg animate-bounce">
                💰
              </div>
              
              {/* Value tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                +{formatNumber(purse.value)}
              </div>
              
              {/* Sparkle effect */}
              <div className="absolute inset-0 animate-ping">
                <div className="text-2xl opacity-50">✨</div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}