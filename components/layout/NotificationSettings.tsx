"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  // Placeholder state for notification preferences
  // In a real app, these would come from user data and be updated via an API call
  const [eventReminders, setEventReminders] = React.useState(true)
  const [productUpdates, setProductUpdates] = React.useState(true)
  const [promotionalOffers, setPromotionalOffers] = React.useState(false)
  const [weeklySummary, setWeeklySummary] = React.useState(false)

  // TODO: Implement save logic
  const handleSaveChanges = () => {
    console.log("Notification preferences saved:", {
      eventReminders,
      productUpdates,
      promotionalOffers,
      weeklySummary,
    })
    // Add API call here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how you receive notifications from us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="event-reminders" className="flex flex-col space-y-1">
            <span>Event Reminders</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Receive reminders for your upcoming calendar events.
            </span>
          </Label>
          <Switch
            id="event-reminders"
            checked={eventReminders}
            onCheckedChange={setEventReminders}
            aria-label="Toggle event reminders"
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="product-updates" className="flex flex-col space-y-1">
            <span>Product Updates</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Get notified about new features and improvements.
            </span>
          </Label>
          <Switch
            id="product-updates"
            checked={productUpdates}
            onCheckedChange={setProductUpdates}
            aria-label="Toggle product updates"
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="promotional-offers" className="flex flex-col space-y-1">
            <span>Promotional Offers</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Receive occasional special offers and discounts.
            </span>
          </Label>
          <Switch
            id="promotional-offers"
            checked={promotionalOffers}
            onCheckedChange={setPromotionalOffers}
            aria-label="Toggle promotional offers"
          />
        </div>
        
        <Separator />

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="weekly-summary" className="flex flex-col space-y-1">
            <span>Weekly Summary</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Get a summary of your week&apos;s activities and upcoming events.
            </span>
          </Label>
          <Switch
            id="weekly-summary"
            checked={weeklySummary}
            onCheckedChange={setWeeklySummary}
            aria-label="Toggle weekly summary"
          />
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
} 