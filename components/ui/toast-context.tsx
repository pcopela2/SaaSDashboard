'use client'

import { createContext } from 'react'

interface ToastProps {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

interface ToastContextType {
  toast: (props: ToastProps) => void
}

const defaultToast: ToastContextType = {
  toast: () => undefined
}

export const ToastContext = createContext<ToastContextType>(defaultToast) 