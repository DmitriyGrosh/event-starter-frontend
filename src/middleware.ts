import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')
  const isProtectedPage = request.nextUrl.pathname.startsWith('/profile') || 
                         request.nextUrl.pathname.startsWith('/calendar') || 
                         request.nextUrl.pathname.startsWith('/notifications')

  // If trying to access auth pages while logged in, redirect to profile
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  // If trying to access protected pages without being logged in, redirect to login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/calendar/:path*', '/notifications/:path*', '/login', '/register']
} 