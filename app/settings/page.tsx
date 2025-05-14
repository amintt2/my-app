"use client"

import { AppLayout } from "@/components/layout/AppLayout";
import { AccountSettings } from "@/components/layout/AccountSettings";
import { NotificationSettings } from "@/components/layout/NotificationSettings";
import { ThemeSettings } from "@/components/layout/ThemeSettings";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-8">
          <AccountSettings />
          <NotificationSettings />
          <ThemeSettings />
        </div>
      </div>
    </AppLayout>
  );
} 