'use client'

import { useState } from 'react'
import {
  DollarSign,
  Package,
  RefreshCcw,
  Clock,
  Filter,
  Search,
  MoreVertical,
} from 'lucide-react'

const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    amount: '$299.99',
    status: 'Completed',
    date: '2024-01-20',
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    amount: '$149.99',
    status: 'Processing',
    date: '2024-01-19',
    items: 2,
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    amount: '$599.99',
    status: 'Pending',
    date: '2024-01-18',
    items: 5,
  },
]

const stats = [
  {
    name: 'Total Sales',
    value: '$45,231',
    icon: DollarSign,
  },
  {
    name: 'Orders',
    value: '156',
    icon: Package,
  },
  {
    name: 'Refunds',
    value: '3',
    icon: RefreshCcw,
  },
  {
    name: 'Pending',
    value: '8',
    icon: Clock,
  },
]

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Create Order
          </button>
        </div>
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
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative flex-1 max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="grid grid-cols-6 gap-4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Items</div>
              <div>Status</div>
              <div>Date</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 bg-white">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50"
              >
                <div className="text-sm font-medium text-indigo-600">
                  {order.id}
                </div>
                <div className="text-sm text-gray-900">{order.customer}</div>
                <div className="text-sm text-gray-900">{order.amount}</div>
                <div className="text-sm text-gray-500">{order.items} items</div>
                <div>
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{order.date}</span>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 