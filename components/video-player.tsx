"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Maximize,
  MessageSquare,
  Settings,
  PictureInPicture2,
} from "lucide-react"

interface VideoPlayerProps {
  movieTitle: string
  movieId: number
}

export default function VideoPlayer({ movieTitle, movieId }: VideoPlayerProps) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const handleMouseMove = () => resetTimeout()
    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowControls(false)
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove)
      containerRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    resetTimeout()

    return () => {
      clearTimeout(timeout)
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isPlaying])

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleDurationChange = () => setDuration(video.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  // Auto-play when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex flex-col cursor-none"
      style={{ cursor: showControls ? "default" : "none" }}
    >
      {/* Video */}
      <div className="flex-1 relative">
        <video ref={videoRef} className="w-full h-full object-contain" src="/videos/st.mp4" onClick={togglePlayPause} />

        {/* Top Controls */}
        <div
          className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <PictureInPicture2 className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Center Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <Play className="h-10 w-10 text-white fill-white ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-red-600 rounded-full relative group-hover:h-2 transition-all"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-4">
            <button onClick={togglePlayPause} className="text-white hover:text-gray-300 transition-colors">
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-white" />}
            </button>

            <button
              onClick={() => skipTime(-10)}
              className="text-white hover:text-gray-300 transition-colors"
              title="Skip back 10 seconds"
            >
              <RotateCcw className="h-6 w-6" />
              <span className="absolute text-xs font-bold">10</span>
            </button>

            <button
              onClick={() => skipTime(10)}
              className="text-white hover:text-gray-300 transition-colors"
              title="Skip forward 10 seconds"
            >
              <RotateCw className="h-6 w-6" />
              <span className="absolute text-xs font-bold">10</span>
            </button>

            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Center Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-white text-lg font-medium">{movieTitle}</h1>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button className="text-white hover:text-gray-300 transition-colors">
              <MessageSquare className="h-6 w-6" />
            </button>

            <button className="text-white hover:text-gray-300 transition-colors">
              <Settings className="h-6 w-6" />
            </button>

            <button onClick={toggleFullscreen} className="text-white hover:text-gray-300 transition-colors">
              <Maximize className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
