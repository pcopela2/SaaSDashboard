'use client'

import { useState, useEffect } from 'react'
import { Content, contentService } from '@/lib/content-service'
import { ContentDialog } from './content-dialog'

interface ContentListProps {
  searchQuery?: string
  viewMode?: 'grid' | 'list'
}

export function ContentList({ searchQuery = '', viewMode = 'list' }: ContentListProps) {
  const [contents, setContents] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<Content | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchContents = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await contentService.listContents()
      setContents(data)
    } catch (error) {
      console.error('Error fetching contents:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContents()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return

    try {
      await contentService.deleteContent(id)
      await fetchContents()
    } catch (error) {
      console.error('Error deleting content:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  const handleEdit = (content: Content) => {
    setSelectedContent(content)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedContent(undefined)
    setIsDialogOpen(true)
  }

  const handlePreview = (content: Content) => {
    // Implement preview functionality
    console.log('Preview content:', content)
  }

  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 m-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    )
  }

  const ActionButtons = ({ content, visible }: { content: Content; visible: boolean }) => (
    <div className={`flex items-center gap-x-2 ${visible ? '' : 'group-hover:block hidden'}`}>
      {visible ? (
        <button
          onClick={() => handleEdit(content)}
          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 h-9 rounded-md px-4 text-gray-600 border border-gray-200"
        >
          Edit
        </button>
      ) : (
        <>
          <button
            onClick={() => handlePreview(content)}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 hover:bg-blue-100 h-9 rounded-md px-4 text-blue-600 border border-blue-200 bg-white"
          >
            Preview
          </button>
          <button
            onClick={() => handleDelete(content.id)}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 hover:bg-red-100 h-9 rounded-md px-4 text-red-600 border border-red-200 bg-white ml-1"
          >
            Delete
          </button>
        </>
      )}
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none"
        >
          Create Content
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="flex-1">
                <div className="relative flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 pr-24 line-clamp-2 min-h-[3rem]">
                    {content.title}
                  </h3>
                  <div className="absolute right-0 top-0 z-10 flex items-center space-x-1">
                    <ActionButtons content={content} visible={false} />
                    <ActionButtons content={content} visible={true} />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-x-2 text-xs">
                  <span className="text-gray-500">{content.type}</span>
                  <span className="text-gray-300">•</span>
                  <span
                    className={content.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}
                  >
                    {content.status}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">2024-01-15</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {content.content 
                      ? content.content.length > 200 
                        ? `${content.content.slice(0, 200)}...` 
                        : content.content
                      : 'No content available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              className="group flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded-md"
            >
              <div className="min-w-0 flex-1 pr-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">{content.title}</h3>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs">
                  <span className="text-gray-500">{content.type}</span>
                  <span className="text-gray-300">•</span>
                  <span
                    className={content.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}
                  >
                    {content.status}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">2024-01-15</span>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {content.content 
                      ? content.content.length > 200 
                        ? `${content.content.slice(0, 200)}...` 
                        : content.content
                      : 'No content available'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <ActionButtons content={content} visible={true} />
                <div className="ml-2">
                  <ActionButtons content={content} visible={false} />
                </div>
              </div>
            </div>
          ))}
          {filteredContents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No content found. Create some content to get started!</p>
            </div>
          )}
        </div>
      )}

      <ContentDialog
        content={selectedContent}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={fetchContents}
      />
    </div>
  )
}