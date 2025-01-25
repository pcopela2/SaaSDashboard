'use client'

import { WarpSpeed } from '@/components/warp-speed'
import { LoginForm } from '@/components/auth/login-form'
import { BioContent } from '@/components/content/bio-content'
import { ErrorBoundary } from '@/components/error-boundary'

export default function LoginPage() {
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <ErrorBoundary>
      <div className="w-full">
        {/* Main login section */}
        <section className="relative h-screen">
          {/* Fixed warp speed background */}
          <div className="fixed top-0 left-0 w-full h-screen bg-black">
            <WarpSpeed />
          </div>

          {/* Login content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="w-[400px] bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-2xl p-8">
              <LoginForm />
            </div>
            
            {/* Down Arrow */}
            <div 
              className="absolute bottom-8 animate-bounce cursor-pointer"
              onClick={handleScrollClick}
            >
              <svg 
                className="w-12 h-12 text-white/30" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Bio Content Section */}
        <section className="relative bg-black">
          <BioContent />
        </section>
      </div>
    </ErrorBoundary>
  )
} 