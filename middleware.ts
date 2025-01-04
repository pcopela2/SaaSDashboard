import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If there is no user and the user is trying to access a protected route
    if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // If there is a user and the user is trying to access auth routes
    if (user && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
      const redirectUrl = new URL('/dashboard', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Auth error:', error)
    // If there's an error, redirect to login
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }
    return res
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
} 