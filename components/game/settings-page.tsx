'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  NotificationSettings, 
  loadNotificationSettings, 
  saveNotificationSettings,
  deleteCookie,
  loadGameFromCookie,
  saveGameToCookie
} from '@/lib/cookie-utils'
import { GameState } from '@/types/game'
import { formatNumber } from '@/lib/game-utils'
import { PurseSettingsComponent } from './purse-settings'

interface SettingsPageProps {
  gameState: GameState
  onClose: () => void
  onResetGame: () => void
}

export default function SettingsPage({ gameState, onClose, onResetGame }: SettingsPageProps) {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(loadNotificationSettings())
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const [purseSettings, setPurseSettings] = useState({
    enabled: true,
    spawnRate: 50,
    difficulty: 100
  })

  useEffect(() => {
    // Auto-save notification settings when they change
    saveNotificationSettings(notificationSettings)
  }, [notificationSettings])

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleExportSave = () => {
    try {
      const saveData = JSON.stringify(gameState, null, 2)
      const blob = new Blob([saveData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `zeub-clicker-save-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setSaveStatus('Sauvegarde exportée avec succès!')
      setTimeout(() => setSaveStatus(null), 3000)
    } catch (error) {
      setSaveStatus('Erreur lors de l\'exportation')
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  const handleImportSave = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const saveData = JSON.parse(e.target?.result as string)
            saveGameToCookie(saveData)
            setSaveStatus('Sauvegarde importée! Rechargez la page.')
            setTimeout(() => setSaveStatus(null), 5000)
          } catch (error) {
            setSaveStatus('Erreur: fichier de sauvegarde invalide')
            setTimeout(() => setSaveStatus(null), 3000)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleResetGame = () => {
    if (showResetConfirm) {
      deleteCookie('zeub-clicker-save')
      onResetGame()
      setShowResetConfirm(false)
      setSaveStatus('Jeu réinitialisé!')
      setTimeout(() => setSaveStatus(null), 3000)
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 5000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">⚙️ Paramètres</CardTitle>
              <CardDescription className="text-white/80">
                Gérez vos préférences et données de jeu
              </CardDescription>
            </div>
            <Button onClick={onClose} variant="outline" size="sm">
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status Messages */}
          {saveStatus && (
            <Alert className="bg-green-500/20 border-green-400">
              <AlertDescription>{saveStatus}</AlertDescription>
            </Alert>
          )}

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔔 Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Activer les notifications</div>
                  <div className="text-sm text-white/70">Active/désactive toutes les notifications</div>
                </div>
                <Switch 
                  checked={notificationSettings.enabled}
                  onCheckedChange={() => handleNotificationToggle('enabled')}
                />
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="space-y-3 opacity-75" style={{ opacity: notificationSettings.enabled ? 1 : 0.5 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Succès débloqués</div>
                    <div className="text-sm text-white/70">Notifications pour les nouveaux succès</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.achievements && notificationSettings.enabled}
                    onCheckedChange={() => handleNotificationToggle('achievements')}
                    disabled={!notificationSettings.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Montée de niveau</div>
                    <div className="text-sm text-white/70">Notifications pour les nouveaux niveaux</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.levelUp && notificationSettings.enabled}
                    onCheckedChange={() => handleNotificationToggle('levelUp')}
                    disabled={!notificationSettings.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Power-ups</div>
                    <div className="text-sm text-white/70">Notifications pour les power-ups</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.powerUps && notificationSettings.enabled}
                    onCheckedChange={() => handleNotificationToggle('powerUps')}
                    disabled={!notificationSettings.enabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marché boursier</div>
                    <div className="text-sm text-white/70">Notifications pour les fluctuations importantes</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.stocks && notificationSettings.enabled}
                    onCheckedChange={() => handleNotificationToggle('stocks')}
                    disabled={!notificationSettings.enabled}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Purse Settings */}
          <PurseSettingsComponent 
            settings={purseSettings}
            onSettingsChange={setPurseSettings}
          />

          <Separator className="bg-white/20" />

          {/* Game Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">📊 Statistiques du jeu</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-sm text-white/70">Argent total</div>
                <div className="font-bold">{formatNumber(gameState.money)} 💰</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-sm text-white/70">Niveau</div>
                <div className="font-bold">Niveau {gameState.level}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-sm text-white/70">Succès</div>
                <div className="font-bold">
                  {Object.values(gameState.unlockedAchievements).filter(Boolean).length} débloqués
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-sm text-white/70">Temps de jeu</div>
                <div className="font-bold">
                  {Math.floor((Date.now() - gameState.startTime) / (1000 * 60 * 60))}h
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Data Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">💾 Gestion des données</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button onClick={handleExportSave} variant="outline" className="w-full">
                📤 Exporter la sauvegarde
              </Button>
              <Button onClick={handleImportSave} variant="outline" className="w-full">
                📥 Importer une sauvegarde
              </Button>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleResetGame}
                variant={showResetConfirm ? "destructive" : "outline"}
                className="w-full"
              >
                {showResetConfirm ? "⚠️ Confirmer la réinitialisation" : "🔄 Réinitialiser le jeu"}
              </Button>
              {showResetConfirm && (
                <div className="text-sm text-red-400 mt-2 text-center">
                  Cliquez à nouveau pour confirmer. Cette action est irréversible!
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Storage Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">🍪 Stockage</h3>
            <div className="text-sm text-white/70 space-y-1">
              <div>• Vos données sont sauvegardées localement dans les cookies de votre navigateur</div>
              <div>• Les sauvegardes sont conservées pendant 1 an</div>
              <div>• Vous pouvez exporter/importer vos données à tout moment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}