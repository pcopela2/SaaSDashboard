'use client'

import { useState, useCallback } from 'react'
import { ToastContext } from './toast-context'
import { ToastProvider as Provider, ToastViewport, Toast, ToastTitle, ToastDescription } from './toast'

interface ToastProps {
  id: string
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, title, description, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <Provider>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id} className={toast.variant === 'destructive' ? 'destructive' : ''}>
            <div className="grid gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
            </div>
          </Toast>
        ))}
        <ToastViewport />
      </Provider>
    </ToastContext.Provider>
  )
} 