import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient(
    { 
      req,
      res,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Allow public access to login, signup, and bio pages
  if (['/login', '/signup', '/'].includes(req.nextUrl.pathname)) {
    return res
  }

  // Protect dashboard and other routes
  if (!session && !req.nextUrl.pathname.startsWith('/login')) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
} 