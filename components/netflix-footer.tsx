import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function NetflixFooter() {
  return (
    <footer className="relative z-10 bg-black/75 text-gray-400 py-8 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Contact Info */}
        <div className="mb-8">
          <p className="text-sm">
            Questions? Call{" "}
            <Link href="tel:000-800-919-1743" className="underline hover:no-underline">
              000-800-919-1743
            </Link>
          </p>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
          <div className="space-y-3">
            <Link href="#" className="block underline hover:no-underline">
              FAQ
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Investor Relations
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Privacy
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Speed Test
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block underline hover:no-underline">
              Help Centre
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Jobs
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Cookie Preferences
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Legal Notices
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block underline hover:no-underline">
              Account
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Ways to Watch
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Corporate Information
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Only on Netflix
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block underline hover:no-underline">
              Media Centre
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Terms of Use
            </Link>
            <Link href="#" className="block underline hover:no-underline">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <div className="relative inline-block">
            <select className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 pr-8 rounded-sm appearance-none focus:outline-none focus:border-gray-500">
              <option value="en">🌐 English</option>
              <option value="hi">🌐 हिन्दी</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        {/* Netflix Region */}
        <div className="mb-6">
          <p className="text-sm">Netflix India</p>
        </div>

        {/* reCAPTCHA Notice */}
        <div>
          <p className="text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Learn more.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
