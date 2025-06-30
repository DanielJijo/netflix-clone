"use client"

import { useState, useEffect, useRef } from "react"

interface NetflixIntroProps {
  onComplete: () => void
}

export default function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // Start fade out animation
      setIsFading(true)

      // Complete the intro after fade animation
      setTimeout(() => {
        setIsVisible(false)
        onComplete()
      }, 500) // 500ms fade duration
    }

    const handleVideoStart = () => {
      // Ensure video plays
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error)
        // If autoplay fails, skip intro
        handleVideoEnd()
      })
    }

    video.addEventListener("ended", handleVideoEnd)
    video.addEventListener("loadeddata", handleVideoStart)

    // Cleanup
    return () => {
      video.removeEventListener("ended", handleVideoEnd)
      video.removeEventListener("loadeddata", handleVideoStart)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video ref={videoRef} className="w-full h-full object-contain" autoPlay muted playsInline preload="auto">
        <source src="/videos/netflix-logo-animation.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
