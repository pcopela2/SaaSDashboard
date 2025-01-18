'use client'

import { createContext } from 'react'

interface ToastContextType {
  toast: (props: { title: string; description: string; variant?: 'default' | 'destructive' }) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined) 