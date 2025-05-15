"use client"

import { useEffect, useState } from "react"

export function CurrentTimeIndicator() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Calculate position based on current time
  const hourPosition = currentTime.getHours()
  const minutePercentage = currentTime.getMinutes()

  // Calculate top position (each hour is 80px tall)
  const topPosition = (hourPosition - 8) * 80 + (minutePercentage / 60) * 80

  return (
    <>
      {/* Current hour highlight */}
      <div
        className="absolute pointer-events-none z-10 bg-red-50"
        style={{
          top: `${Math.floor(topPosition / 80) * 120}px`,
          left: "calc(100% / 8)", // Start after hours column
          width: "calc(100% / 8)", // Cover Tuesday column only
          height: "120px", // One hour height
          opacity: 0.15,
        }}
      />

      {/* Horizontal line spanning the entire Tuesday column */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          top: `${topPosition}px`,
          left: "calc(100% / 8)", // Start after hours column
          width: "calc(100% / 8)", // Cover Tuesday column only
          height: "px",
          background: "linear-gradient(90deg, rgba(239,68,68,0.5) 0%, rgba(239,68,68,1) 50%, rgba(239,68,68,0.5) 100%)",
          boxShadow: "0 0 8px rgba(239,68,68,0.5)",
        }}
      >
        {/* Pulsing dot */}
        <div className="absolute -top-3 right-0 flex items-center justify-center">
          <div className="absolute h-6 w-6 animate-ping rounded-full bg-red-500 opacity-30"></div>
          <div className="relative h-4 w-4 rounded-full bg-red-500 shadow-lg"></div>
        </div>
      </div>

      {/* "Maintenant" label */}
      <div
        className="absolute pointer-events-none z-20 rounded-l-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 shadow-sm"
        style={{
          top: `${topPosition - 10}px`,
          left: "calc(100% / 8)", // Start at Tuesday column
          transform: "translateX(-100%)",
        }}
      >
        Maintenant
      </div>
    </>
  )
}
