"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroBanner from "@/components/hero-banner"
import SingleMovieCard from "@/components/single-movie-card"
import Footer from "@/components/footer"
import NetflixIntro from "@/components/netflix-intro"
import { movieRows } from "@/data/movies"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem("netflix-intro-seen")

    if (hasSeenIntro) {
      setShowIntro(false)
      setShowContent(true)
    }
  }, [])

  const handleIntroComplete = () => {
    // Mark intro as seen for this session
    sessionStorage.setItem("netflix-intro-seen", "true")
    setShowIntro(false)

    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  if (showIntro) {
    return <NetflixIntro onComplete={handleIntroComplete} />
  }

  return (
    <main
      className={`min-h-screen bg-[#141414] text-white overflow-x-hidden transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <Navbar />
      <HeroBanner />

      {/* Movie Rows Section */}
      <div className="flex flex-col pl-4 md:pl-12 lg:pl-16 space-y-8 pb-[180px]">
        {movieRows.map((row, rowIndex) => (
          <div key={rowIndex} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">{row.title}</h2>
            <div className="flex gap-4">
              {row.movies.map((movie) => (
                <SingleMovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer/>
    </main>
  )
}
