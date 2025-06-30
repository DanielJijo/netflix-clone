"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Info, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isInViewport, setIsInViewport] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Show video after 3 seconds
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Intersection Observer to track if video is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting)
        })
      },
      {
        threshold: 0.5, // Video needs to be at least 50% visible
        rootMargin: "0px 0px -100px 0px", // Start pausing when video is 100px from bottom
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Control video playback based on viewport visibility
    if (videoRef.current && showVideo) {
      if (isInViewport) {
        videoRef.current.play().catch((error) => {
          console.log("Video play failed:", error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInViewport, showVideo])

  useEffect(() => {
    // Initial video play when it becomes visible
    if (showVideo && videoRef.current && isInViewport) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [showVideo])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-[56.25vw] min-h-[400px] max-h-[700px]">
      {/* Hero Background Image - Shows first */}
      {!showVideo && (
        <Image
          src="/images/stranger-things-hero.webp"
          alt="Featured Movie"
          fill
          priority
          className="object-cover transition-opacity duration-500"
        />
      )}

      {/* Hero Background Video - Shows after 3 seconds */}
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          autoPlay={false} // We'll control play/pause manually
          muted={isMuted}
          loop
          playsInline
          controls={false}
        >
          <source src="/videos/st.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

      {/* Volume Control Button - Only show when video is playing */}
      {showVideo && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors border border-white/20"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </button>
      )}

      {/* Viewport Status Indicator (for debugging - remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {isInViewport ? "In Viewport" : "Out of Viewport"} | {showVideo ? "Video" : "Image"}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-[25%] md:bottom-[30%] left-0 w-full px-4 md:px-12 lg:px-16">
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-shadow">Stranger Things</h1>
          <p className="text-sm md:text-base lg:text-lg mb-5 line-clamp-3 text-shadow-sm max-w-md text-gray-200">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying
            supernatural forces, and one strange little girl.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-black hover:bg-white/90 transition-all flex items-center gap-2 px-6 py-2 text-sm md:text-base">
              <Play className="h-5 w-5 fill-black" />
              Play
            </Button>
            <Button
              variant="outline"
              className="bg-gray-500/40 text-white border-none hover:bg-gray-500/60 transition-all flex items-center gap-2 px-6 py-2 text-sm md:text-base"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
