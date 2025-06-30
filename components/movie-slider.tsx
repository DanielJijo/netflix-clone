"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp } from "lucide-react"

interface Movie {
  id: number
  title: string
  imageUrl: string
  year: string
  rating: string
}

interface MovieSliderProps {
  title: string
  movies: Movie[]
}

export default function MovieSlider({ title, movies }: MovieSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="px-4 md:px-8 mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">{title}</h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 px-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
        )}

        {/* Movie Cards Container */}
        <div
          ref={sliderRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 px-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}

function MovieCard({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex-shrink-0 w-[280px] cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-lg overflow-hidden bg-gray-800">
        {/* Movie Poster */}
        <div className="aspect-video relative">
          <Image src={movie.imageUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />

          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="flex gap-2">
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="h-6 w-6 text-black fill-black ml-1" />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  <Plus className="h-6 w-6" />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  <ThumbsUp className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{movie.year}</span>
            <span>•</span>
            <span className="border border-gray-500 px-2 py-0.5 text-xs">{movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
