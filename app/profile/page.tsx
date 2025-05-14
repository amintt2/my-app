"use client"

import { AppLayout } from "@/components/layout/AppLayout";
import { ProfileHeader } from "@/components/layout/ProfileHeader";
import { ProfileDetails } from "@/components/layout/ProfileDetails";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="bg-card p-6 rounded-lg shadow">
          <ProfileHeader />
          <ProfileDetails />
        </div>
      </div>
    </AppLayout>
  );
} 