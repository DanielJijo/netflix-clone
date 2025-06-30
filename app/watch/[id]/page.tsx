"use client"

import { useParams } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import { movieRows } from "@/data/movies"

export default function WatchPage() {
  const params = useParams()
  const movieId = Number.parseInt(params.id as string)

  // Find the movie by ID
  const movie = movieRows.flatMap((row) => row.movies).find((movie) => movie.id === movieId)

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    )
  }

  return <VideoPlayer movieTitle={movie.title} movieId={movie.id} />
}
