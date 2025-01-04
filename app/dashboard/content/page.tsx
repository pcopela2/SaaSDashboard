'use client'

import { useState } from 'react'
import { Search, Grid, List } from 'lucide-react'
import { ContentList } from '@/components/content/content-list'

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content</h2>
          <p className="text-sm text-muted-foreground">
            Manage and organize your content assets
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-0"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex rounded-md shadow-sm ml-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
              viewMode === 'grid'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border rounded-lg bg-white">
        <ContentList searchQuery={searchQuery} viewMode={viewMode} />
      </div>
    </div>
  )
} 