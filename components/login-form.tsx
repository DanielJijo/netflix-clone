"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any existing intro session data to ensure intro plays
    sessionStorage.removeItem("netflix-intro-seen")

    // Navigate to home page (intro will play automatically)
    router.push("/home")
  }

  return (
    <div className="w-full max-w-md bg-black/75 rounded-md p-8 md:p-16">
      <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="relative">
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(email.length > 0)}
              className="bg-[#333] border-none text-white h-14 px-4 pt-4 pb-2 w-full rounded-md focus:ring-0 focus:outline-none"
            />
            <Label
              htmlFor="email"
              className={`absolute left-4 text-gray-400 transition-all duration-200 pointer-events-none ${
                emailFocused ? "text-xs top-2" : "top-1/2 -translate-y-1/2"
              }`}
            >
              Email or phone number
            </Label>
          </div>
        </div>

        <div className="relative">
          <div className="relative">
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(password.length > 0)}
              className="bg-[#333] border-none text-white h-14 px-4 pt-4 pb-2 w-full rounded-md focus:ring-0 focus:outline-none"
            />
            <Label
              htmlFor="password"
              className={`absolute left-4 text-gray-400 transition-all duration-200 pointer-events-none ${
                passwordFocused ? "text-xs top-2" : "top-1/2 -translate-y-1/2"
              }`}
            >
              Password
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#e50914] hover:bg-[#f40612] text-white font-medium py-3 rounded-md">
          Sign In
        </Button>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-gray-600 data-[state=checked]:bg-[#e50914] data-[state=checked]:border-[#e50914]"
            />
            <label htmlFor="remember" className="text-gray-400 text-sm">
              Remember me
            </label>
          </div>
          <Link href="#" className="text-gray-400 text-sm hover:underline">
            Need help?
          </Link>
        </div>
      </form>

      <div className="mt-16">
        <p className="text-gray-500">
          New to Netflix?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign up now
          </Link>
        </p>
        <p className="text-gray-500 text-xs mt-4">
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Learn more.
          </Link>
        </p>
      </div>
    </div>
  )
}
