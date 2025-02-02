import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/signup']
const PROTECTED_ROUTES = ['/dashboard']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Get session only when needed
    const pathname = req.nextUrl.pathname
    const needsSession = PROTECTED_ROUTES.some(route => pathname.startsWith(route)) || 
                        PUBLIC_ROUTES.includes(pathname)

    if (!needsSession) {
      return res
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Handle root path
    if (pathname === '/') {
      return NextResponse.redirect(new URL(session ? '/dashboard' : '/login', req.url))
    }

    // Handle public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return res
    }

    // Handle protected routes
    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      return res
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
} 