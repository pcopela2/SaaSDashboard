'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageSquare, Flag, MoreVertical, Search } from 'lucide-react'

const members = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Admin',
    avatar: 'https://picsum.photos/200',
    status: 'active',
    lastActive: '2 hours ago',
    posts: 156,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Moderator',
    avatar: 'https://picsum.photos/201',
    status: 'away',
    lastActive: '1 day ago',
    posts: 89,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Member',
    avatar: 'https://picsum.photos/202',
    status: 'offline',
    lastActive: '3 days ago',
    posts: 45,
  },
]

const discussions = [
  {
    id: 1,
    title: 'Getting started with our platform',
    author: 'John Doe',
    replies: 23,
    views: 156,
    lastActivity: '1 hour ago',
  },
  {
    id: 2,
    title: 'Best practices for community engagement',
    author: 'Jane Smith',
    replies: 45,
    views: 289,
    lastActivity: '3 hours ago',
  },
  {
    id: 3,
    title: 'Feature request: Dark mode',
    author: 'Mike Johnson',
    replies: 12,
    views: 98,
    lastActivity: '1 day ago',
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            New Discussion
          </button>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Members list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Members</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative h-10 w-10">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      layout="fill"
                      className="rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        member.status === 'active'
                          ? 'bg-green-400'
                          : member.status === 'away'
                          ? 'bg-yellow-400'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Discussions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Discussions</h2>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {discussion.title}
                  </h3>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.lastActivity}</span>
                </div>
                <div className="mt-4 flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {discussion.replies} replies
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flag className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {discussion.views} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 