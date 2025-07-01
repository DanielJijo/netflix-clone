"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"

interface Movie {
  id: number
  title: string
  imageUrl: string
}

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex-shrink-0 w-[48%] sm:w-[31%] md:w-[23%] lg:w-[15%] max-w-[200px] md:max-w-[240px] lg:max-w-[300px] transition-transform duration-300 ease-out min-w-[140px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative overflow-hidden rounded-md transition-all duration-300
          ${isHovered ? "scale-110 z-10 shadow-2xl" : "scale-100"}
        `}
      >
        {/* Thumbnail Image */}
        <div className="aspect-video relative">
          <Image src={movie.imageUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
        </div>

        {/* Hover Details */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex flex-col">
            <div className="mt-auto p-2 bg-black/80">
              <div className="flex items-center gap-2 mb-2">
                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90">
                  <Play className="h-4 w-4 fill-black text-black" />
                </button>
                <button className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white">
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center ml-auto hover:border-white">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-sm font-medium">{movie.title}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
