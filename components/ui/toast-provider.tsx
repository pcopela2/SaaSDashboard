'use client'

import { useState, useCallback } from 'react'
import { ToastContext } from './toast-context'
import { ToastProvider as Provider, ToastViewport, Toast, ToastTitle, ToastDescription } from './toast'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<{
    id: string
    title: string
    description: string
    variant?: 'default' | 'destructive'
  }>>([])

  const toast = useCallback(({ title, description, variant = 'default' }) => {
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
        {toasts.map(({ id, title, description, variant }) => (
          <Toast key={id} variant={variant}>
            <div className="grid gap-1">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </div>
          </Toast>
        ))}
        <ToastViewport />
      </Provider>
    </ToastContext.Provider>
  )
} 