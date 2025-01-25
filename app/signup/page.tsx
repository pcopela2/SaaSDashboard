'use client'

import { SignUpForm } from '@/components/auth/signup-form'
import { WarpSpeedLight } from '@/components/warp-speed-light'
import { BioContent } from '@/components/content/bio-content'

export default function SignUpPage() {
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="w-full">
      <section className="relative h-screen">
        {/* Fixed warp speed background */}
        <div className="fixed top-0 left-0 w-full h-screen bg-white">
          <WarpSpeedLight />
        </div>

        {/* Signup content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="w-[400px] bg-white/95 backdrop-blur-sm rounded-lg border border-black/20 shadow-2xl p-8">
            <SignUpForm />
          </div>
          
          {/* Down Arrow */}
          <div 
            className="absolute bottom-8 animate-bounce cursor-pointer"
            onClick={handleScrollClick}
          >
            <svg 
              className="w-12 h-12 text-black/30" 
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
  )
} 