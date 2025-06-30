import Image from "next/image"
import LoginForm from "@/components/login-form"
import NetflixFooter from "@/components/netflix-footer"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/netflix-background.jpg" alt="Netflix Shows" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-32 md:w-44">
            <Image src="/images/netflix.svg" alt="Netflix" width={167} height={45} className="w-full" priority />
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center relative z-10 px-4 pb-16">
        <LoginForm />
      </div>

      {/* Footer */}
      <NetflixFooter />
    </main>
  )
}
