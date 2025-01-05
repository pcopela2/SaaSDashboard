'use client'

import { useState, useEffect } from 'react'
import { 
  Content, 
  CreateContentInput, 
  contentService,
  ContentType,
  ContentStatus 
} from '@/lib/content-service'

// Type guard functions
function isValidContentType(value: string): value is ContentType {
  return ['Article', 'Page', 'Email'].includes(value)
}

function isValidContentStatus(value: string): value is ContentStatus {
  return ['Draft', 'Published'].includes(value)
}

interface ContentDialogProps {
  content?: Content
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

// Define error type for API responses
interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>

export function ContentDialog({ content, isOpen, onClose, onSuccess }: ContentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateContentInput>({
    title: '',
    type: 'Article',
    status: 'Draft',
    content: '',
  })

  // Reset form data when dialog opens/closes or content changes
  useEffect(() => {
    if (isOpen && content) {
      // If editing existing content, populate form with content data
      setFormData({
        title: content.title,
        type: content.type,
        status: content.status,
        content: content.content || '',
      })
    } else if (isOpen) {
      // If creating new content, reset to defaults
      setFormData({
        title: '',
        type: 'Article',
        status: 'Draft',
        content: '',
      })
    }
  }, [isOpen, content])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (content?.id) {
        console.log('Updating content:', { id: content.id, ...formData })
        await contentService.updateContent({
          id: content.id,
          ...formData,
        })
      } else {
        console.log('Creating content:', formData)
        await contentService.createContent(formData)
      }

      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error('Error submitting content:', error)
      const apiError = error as ApiError
      setError(apiError.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {content ? 'Edit Content' : 'Create Content'}
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={formData.type}
                  onChange={(e: SelectChangeEvent) => {
                    const newType = e.target.value
                    if (isValidContentType(newType)) {
                      setFormData({ ...formData, type: newType })
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <option value="Article">Article</option>
                  <option value="Page">Page</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={formData.status}
                  onChange={(e: SelectChangeEvent) => {
                    const newStatus = e.target.value
                    if (isValidContentStatus(newStatus)) {
                      setFormData({ ...formData, status: newStatus })
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 sm:col-start-2 sm:text-sm"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 