'use client'

import { WarpSpeedLight } from '@/components/warp-speed-light'
import { SignUpForm } from '@/components/auth/signup-form'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white">
      <WarpSpeedLight />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-xl p-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
} 