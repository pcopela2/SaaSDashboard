'use client'

import { useState } from 'react'
import {
  Search,
  Book,
  MessageCircle,
  Video,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'

const categories = [
  {
    name: 'Getting Started',
    icon: Book,
    articles: [
      'Platform Overview',
      'Account Setup',
      'First Steps Guide',
      'Basic Navigation',
    ],
  },
  {
    name: 'Features & Tutorials',
    icon: Video,
    articles: [
      'Content Management',
      'User Analytics',
      'Marketing Tools',
      'Sales Dashboard',
    ],
  },
  {
    name: 'FAQs',
    icon: HelpCircle,
    articles: [
      'Billing Questions',
      'Account Access',
      'Security Settings',
      'Common Issues',
    ],
  },
  {
    name: 'Support',
    icon: MessageCircle,
    articles: [
      'Contact Support',
      'Submit a Ticket',
      'Live Chat',
      'Support Hours',
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">How can we help?</h1>
        <p className="mt-4 text-lg text-gray-500">
          Search our documentation or browse categories below
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div>
              <category.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {category.name}
              </h3>
            </div>
            <div className="mt-4">
              <ul className="space-y-4">
                {category.articles.map((article) => (
                  <li key={article}>
                    <a
                      href="#"
                      className="group flex items-center text-sm text-gray-500 hover:text-gray-900"
                    >
                      <ChevronRight className="mr-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact support */}
      <div className="mt-12 rounded-lg bg-indigo-50 px-6 py-8 sm:py-12 sm:px-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Need more help?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="flex space-x-4">
              <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Contact Support
              </button>
              <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 