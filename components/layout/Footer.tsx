"use client"

import * as React from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 w-auto justify-between">
      <div className="w-full px-3 sm:px-5 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-base font-semibold mb-3">AI Calendar</h3>
            <p className="text-sm text-muted-foreground">
              Organize your life with our intelligent calendar app.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Links</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
          </div>
        </div>
        <Separator className="my-5" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Calendar. All rights reserved.
          </p>
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
} 