"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./movie-card"

interface Movie {
  id: number
  title: string
  imageUrl: string
}

interface ContentRowProps {
  title: string
  movies: Movie[]
}

export default function ContentRow({ title, movies }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.8
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Mouse drag scrolling
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - rowRef.current!.offsetLeft)
    setScrollLeft(rowRef.current!.scrollLeft)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    if (rowRef.current) {
      const x = e.pageX - rowRef.current.offsetLeft
      const walk = (x - startX) * 2 // Scroll speed
      rowRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const onMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="px-4 md:px-8 mb-8">
      <h2 className="text-lg md:text-xl font-bold mb-2">{title}</h2>
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/80 px-2 hidden group-hover:flex items-center justify-center"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Content Slider */}
        <div
          ref={rowRef}
          className="flex flex-wrap gap-4 justify-center md:justify-start px-4"
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/80 px-2 hidden group-hover:flex items-center justify-center"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  )
}
