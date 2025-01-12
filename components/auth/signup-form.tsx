'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, just redirect
    router.push('/dashboard')
  }

  return (
    <div className="text-gray-900">
      <h2 className="text-2xl font-bold text-center mb-8">
        Create your account
      </h2>
      <form className="space-y-6" onSubmit={handleSignUp}>
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white 
                   rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Sign up
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Back to Sign in screen
          </Link>
        </div>
      </form>
    </div>
  )
} 