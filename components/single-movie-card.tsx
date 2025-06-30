"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, Plus, ThumbsUp, ChevronDown, Download, Volume2 } from "lucide-react"
import { Dialog, DialogTrigger, DialogContainer, DialogContent, DialogClose } from "./linear-dialog"

interface Movie {
  id: number
  title: string
  subtitle: string
  imageUrl: string
  year: string
  rating: string
  contentType: string
  quality: string
  genres: string[]
  duration: string
  contentRating: string
  description: string
  cast: string[]
  director?: string
  tags: string[]
}

interface SingleMovieCardProps {
  movie: Movie
}

export default function SingleMovieCard({ movie }: SingleMovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handlePlayClick = () => {
    router.push(`/watch/${movie.id}`)
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`relative h-[130px] w-auto cursor-pointer transition-all duration-300 ${
              isHovered ? "scale-110 z-50" : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Base Card - Always visible */}
            <div className="relative rounded-md overflow-hidden h-full">
              <Image
                src={movie.imageUrl || "/placeholder.svg"}
                alt={movie.title}
                width={231}
                height={130}
                className="object-cover rounded-md"
              />
            </div>

            {/* Expanded Card - Shows on hover */}
            {isHovered && (
              <div className="absolute top-0 left-0 w-[231px] rounded-md overflow-hidden shadow-2xl z-50 bg-[#181818] transition-all duration-300">
                {/* Video/Image Section */}
                <div className="relative h-[130px]">
                  <Image
                    src={movie.imageUrl || "/placeholder.svg"}
                    alt={movie.title}
                    width={231}
                    height={130}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content Section */}
                <div className="p-3">
                  {/* Title */}
                  <h3 className="text-sm font-bold text-white mb-2">{movie.title}</h3>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayClick()
                      }}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
                    >
                      <Play className="h-3 w-3 fill-black text-black ml-0.5" />
                    </button>
                    <button className="w-7 h-7 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                      <Plus className="h-3 w-3 text-white" />
                    </button>
                    <button className="w-7 h-7 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                      <ThumbsUp className="h-3 w-3 text-white" />
                    </button>
                    <button className="w-7 h-7 rounded-full border border-gray-500 flex items-center justify-center ml-auto hover:border-white transition-colors">
                      <ChevronDown className="h-3 w-3 text-white" />
                    </button>
                  </div>

                  {/* Rating and Info */}
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="border border-gray-500 px-1.5 py-0.5 text-xs text-white">{movie.rating}</span>
                    <span className="text-gray-300 text-xs">{movie.contentType}</span>
                    <span className="border border-gray-500 px-1.5 py-0.5 text-xs font-bold text-white">
                      {movie.quality}
                    </span>
                  </div>

                  {/* Genres */}
                  <div className="text-xs text-gray-300">
                    {movie.genres.map((genre, index) => (
                      <span key={genre}>
                        {genre}
                        {index < movie.genres.length - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>

        <DialogContainer>
          <DialogContent className="w-[850px] max-w-[90vw] mx-auto mt-20 bg-black text-white rounded-lg overflow-hidden shadow-2xl relative">
            <div className="relative h-[400px]">
              <Image
                src={movie.imageUrl || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <DialogClose className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </DialogClose>

              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <div className="max-w-md">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{movie.title.toUpperCase()}</h1>

                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={handlePlayClick}
                      className="bg-white text-black px-6 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors"
                    >
                      <Play className="h-4 w-4 fill-black" />
                      Play
                    </button>
                    <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                      <Plus className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="text-white font-semibold">{movie.year}</span>
                <span className="text-white">{movie.duration}</span>
                <span className="border border-gray-400 px-2 py-1 text-xs font-bold">{movie.quality}</span>
                <span className="border border-gray-400 px-2 py-1 text-xs">{movie.contentRating}</span>
                <span className="text-gray-300">biographical drama, historical</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-200 mb-4 leading-relaxed">{movie.description}</p>
                </div>

                <div className="text-sm">
                  <p className="text-gray-400 mb-3">
                    <span className="text-white">Cast:</span> {movie.cast.join(", ")}
                    {movie.cast.length > 3 && (
                      <span className="text-blue-400 cursor-pointer hover:underline"> more</span>
                    )}
                  </p>
                  <p className="text-gray-400 mb-3">
                    <span className="text-white">Genres:</span> {movie.genres.join(", ")}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-white">This Movie Is:</span> {movie.tags.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogContainer>
      </Dialog>
    </div>
  )
}
