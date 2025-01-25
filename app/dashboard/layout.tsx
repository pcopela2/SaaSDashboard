'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  BarChart2,
  ShoppingCart,
  Store,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/providers/auth-provider'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Sales', href: '/dashboard/sales', icon: ShoppingCart },
  { name: 'Storefront', href: '/dashboard/storefront', icon: Store },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { signOut, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut()
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-gray-900/80 lg:hidden',
          sidebarOpen ? 'block' : 'hidden'
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              SaaS Dashboard
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-6 w-6 flex-shrink-0',
                      isActive
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Secondary navigation */}
          <div className="border-t border-gray-200 px-2 py-4">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-6 w-6 flex-shrink-0',
                      isActive
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="mt-2 flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-3 h-6 w-6 flex-shrink-0" />
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              SaaS Dashboard
            </Link>
            <button
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  )
} 