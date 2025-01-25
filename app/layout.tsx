import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/providers/auth-provider'
import { ToastProvider } from '@/components/ui/toast-provider'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Dashboard',
  description: 'Modern SaaS Dashboard with Onboarding Flow',
}

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <AuthProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </AuthProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
