'use client'

import { useState } from 'react'
import {
  BarChart,
  Mail,
  MessageSquare,
  Share2,
  Calendar,
  Clock,
  Users,
  Zap,
} from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Spring Sale 2024',
    status: 'Active',
    type: 'Email',
    audience: 'All Customers',
    sent: 1234,
    opened: 876,
    clicked: 234,
    lastModified: '2024-01-20',
  },
  {
    id: 2,
    name: 'Product Launch',
    status: 'Scheduled',
    type: 'Social',
    audience: 'New Customers',
    sent: 0,
    opened: 0,
    clicked: 0,
    lastModified: '2024-01-19',
  },
  {
    id: 3,
    name: 'Customer Feedback',
    status: 'Draft',
    type: 'Email',
    audience: 'Active Users',
    sent: 0,
    opened: 0,
    clicked: 0,
    lastModified: '2024-01-18',
  },
]

const stats = [
  {
    name: 'Total Sent',
    value: '12.5K',
    icon: Mail,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Open Rate',
    value: '68%',
    icon: MessageSquare,
    change: '+4%',
    changeType: 'positive',
  },
  {
    name: 'Click Rate',
    value: '24%',
    icon: Share2,
    change: '-2%',
    changeType: 'negative',
  },
  {
    name: 'Conversion',
    value: '3.2%',
    icon: Zap,
    change: '+8%',
    changeType: 'positive',
  },
]

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
        <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`${
              activeTab === 'campaigns'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`${
              activeTab === 'templates'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('audiences')}
            className={`${
              activeTab === 'audiences'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
          >
            Audiences
          </button>
        </nav>
      </div>

      {/* Campaign list */}
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <div className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <div className="flex items-center">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {campaign.name}
                        </p>
                        <span
                          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            campaign.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : campaign.status === 'Scheduled'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {campaign.audience}
                        </div>
                        <div className="ml-4 flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {campaign.lastModified}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Edit
                      </button>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
                        Duplicate
                      </button>
                      <button className="text-sm font-medium text-red-600 hover:text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 