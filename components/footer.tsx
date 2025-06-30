import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-16 text-gray-400 text-xs">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-gray-300 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  New & Popular
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  My List
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-300 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-300 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Corporate Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-300 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Media Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2025 Netflix Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
