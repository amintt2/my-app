"use client"

import * as React from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'

export default function MainPage() {
  const supabase = createClient()
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isLoadingSession, setIsLoadingSession] = React.useState(true)

  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user ?? null);
      setIsLoadingSession(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setCurrentUser(session?.user ?? null);
      setIsLoadingSession(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  const isAuthenticated = !!currentUser;

  if (isLoadingSession) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple Header */}
      <header className="py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AI Calendar</h1>
          <nav>
            {isAuthenticated ? (
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto py-12 px-6">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Organize Your Life with AI</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our AI Calendar intelligently helps you manage your schedule, events, and tasks.
          </p>
          {!isAuthenticated && (
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
          )}
        </section>

        <section id="features" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Smart Scheduling</h4>
              <p className="text-muted-foreground">Let AI find the best time for your events.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Event Categorization</h4>
              <p className="text-muted-foreground">Automatically categorize your events (work, personal, etc.).</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Seamless Integration</h4>
              <p className="text-muted-foreground">Connect with your favorite tools and calendars.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to take control of your time?</h3>
          {!isAuthenticated ? (
            <Button size="lg" variant="outline" asChild className="mr-4">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          ) : null}
          <Button size="lg" asChild>
            <Link href={isAuthenticated ? "/dashboard" : "/auth/signup"}>
              {isAuthenticated ? "View Dashboard" : "Sign Up Now"}
            </Link>
          </Button>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
