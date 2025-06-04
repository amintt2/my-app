"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface PurseSettings {
  enabled: boolean
  spawnRate: number
  difficulty: number
}

interface PurseSettingsProps {
  settings: PurseSettings
  onSettingsChange: (settings: PurseSettings) => void
}

export function PurseSettingsComponent({ settings, onSettingsChange }: PurseSettingsProps) {
  const handleEnabledChange = (enabled: boolean) => {
    onSettingsChange({ ...settings, enabled })
  }

  const handleSpawnRateChange = (value: number[]) => {
    onSettingsChange({ ...settings, spawnRate: value[0] })
  }

  const handleDifficultyChange = (value: number[]) => {
    onSettingsChange({ ...settings, difficulty: value[0] })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💰 Système de Bourses Volantes
        </CardTitle>
        <CardDescription className="text-white/80">
          Configurez l'apparition des bourses bonus Zubdoré
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="purse-enabled" className="text-white">
            Activer les bourses volantes
          </Label>
          <Switch
            id="purse-enabled"
            checked={settings.enabled}
            onCheckedChange={handleEnabledChange}
          />
        </div>

        {settings.enabled && (
          <>
            {/* Spawn Rate Slider */}
            <div className="space-y-2">
              <Label className="text-white">
                Fréquence d'apparition: {settings.spawnRate}%
              </Label>
              <Slider
                value={[settings.spawnRate]}
                onValueChange={handleSpawnRateChange}
                max={100}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/60">
                <span>Rare</span>
                <span>Fréquent</span>
              </div>
            </div>

            {/* Difficulty Slider */}
            <div className="space-y-2">
              <Label className="text-white">
                Vitesse de déplacement: {settings.difficulty}%
              </Label>
              <Slider
                value={[settings.difficulty]}
                onValueChange={handleDifficultyChange}
                max={150}
                min={50}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/60">
                <span>Lent</span>
                <span>Rapide</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
              <p className="text-sm text-blue-100">
                💡 <strong>Astuce:</strong> Les bourses donnent plus d'XP et d'argent selon votre niveau. 
                Plus votre niveau est élevé, plus les récompenses sont importantes!
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}