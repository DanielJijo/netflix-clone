"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300 py-2 px-4 md:px-8 flex items-center justify-between",
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <div className="flex items-center">
        {/* Logo */}
        <Link href="/" className="mr-4">
          <div className="relative h-8 w-28">
            <Image src="/images/netflix.svg" alt="Netflix" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-sm font-medium hover:text-gray-300">
            Home
          </Link>
          <Link href="/tv-shows" className="text-sm font-medium hover:text-gray-300">
            TV Shows
          </Link>
          <Link href="/movies" className="text-sm font-medium hover:text-gray-300">
            Movies
          </Link>
          <Link href="/new" className="text-sm font-medium hover:text-gray-300">
            New & Popular
          </Link>
          <Link href="/my-list" className="text-sm font-medium hover:text-gray-300">
            My List
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        <button aria-label="Search" className="hover:text-gray-300">
          <Search size={20} />
        </button>
        <button aria-label="Notifications" className="hover:text-gray-300">
          <Bell size={20} />
        </button>
        <div className="relative group">
          <button className="flex items-center space-x-1 hover:text-gray-300">
            <div className="h-8 w-8 rounded overflow-hidden">
              <Image src="/images/profile-avatar.png" alt="Profile" width={32} height={32} className="object-cover" />
            </div>
            <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-800 rounded shadow-lg py-2 hidden group-hover:block">
            <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-800">
              Profile
            </Link>
            <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-800">
              Account
            </Link>
            <Link href="/help" className="block px-4 py-2 text-sm hover:bg-gray-800">
              Help Center
            </Link>
            <hr className="my-1 border-gray-700" />
            <Link href="/signout" className="block px-4 py-2 text-sm hover:bg-gray-800">
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-50 pt-16">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tv-shows"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              href="/movies"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              href="/new"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New & Popular
            </Link>
            <Link
              href="/my-list"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My List
            </Link>
            <hr className="border-gray-700" />
            <Link
              href="/profile"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/account"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Account
            </Link>
            <Link
              href="/help"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help Center
            </Link>
            <Link
              href="/signout"
              className="text-lg font-medium hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Out
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
