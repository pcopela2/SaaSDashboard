'use client'

import { useState } from 'react'
import {
  BarChart2,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Filter,
} from 'lucide-react'

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    name: 'Active Users',
    value: '2,345',
    change: '+15.2%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    changeType: 'negative',
    icon: TrendingUp,
  },
  {
    name: 'Avg. Order Value',
    value: '$89.34',
    change: '+10.3%',
    changeType: 'positive',
    icon: BarChart2,
  },
]

const timeRanges = [
  { id: 'today', name: 'Today' },
  { id: 'yesterday', name: 'Yesterday' },
  { id: '7d', name: 'Last 7 days' },
  { id: '30d', name: 'Last 30 days' },
  { id: '90d', name: 'Last 90 days' },
]

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Time range selector */}
      <div className="flex space-x-4">
        {timeRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setSelectedTimeRange(range.id)}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              selectedTimeRange === range.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {range.name}
          </button>
        ))}
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Revenue Over Time
              </h3>
              <div className="flex items-center space-x-4">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View Details
                </button>
              </div>
            </div>
            <div className="mt-6">
              <div className="h-64 w-full rounded-lg bg-gray-50" />
            </div>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                User Activity
              </h3>
              <div className="flex items-center space-x-4">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View Details
                </button>
              </div>
            </div>
            <div className="mt-6">
              <div className="h-64 w-full rounded-lg bg-gray-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Data table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Detailed Analytics
            </h3>
            <div className="flex items-center space-x-4">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Download Report
              </button>
            </div>
          </div>
          <div className="mt-6">
            <div className="min-h-[200px] rounded-lg border border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
} 