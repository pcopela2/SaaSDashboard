'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Grid,
  List,
} from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: '$299.99',
    stock: 45,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: '$49.99',
    stock: 12,
    category: 'Electronics',
    image: 'https://picsum.photos/401/400',
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: '$149.99',
    stock: 0,
    category: 'Electronics',
    image: 'https://picsum.photos/402/400',
    status: 'Out of Stock',
  },
]

export default function StorefrontPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Storefront</h1>
        <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="mr-2 h-5 w-5" />
          Add Product
        </button>
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
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'space-y-4'
        }
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow ${
              viewMode === 'list' ? 'flex items-center' : ''
            }`}
          >
            <div
              className={`relative ${
                viewMode === 'grid' ? 'aspect-square w-full' : 'h-24 w-24'
              }`}
            >
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === 'In Stock'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 