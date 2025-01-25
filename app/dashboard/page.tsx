'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  Layout,
  Calendar,
} from 'lucide-react'

const onboardingSteps = [
  {
    id: 1,
    title: 'Complete your profile',
    description: 'Add your company details and branding',
    icon: Layout,
  },
  {
    id: 2,
    title: 'Set up your first campaign',
    description: 'Create and launch your marketing campaign',
    icon: Layout,
  },
  {
    id: 3,
    title: 'Connect your accounts',
    description: 'Link your social media and payment accounts',
    icon: Layout,
  },
  {
    id: 4,
    title: 'Invite your team',
    description: 'Add team members and assign roles',
    icon: Layout,
  },
]

export default function DashboardPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to your dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Let&apos;s get you started with the basics
        </p>
      </div>

      {/* Onboarding checklist */}
      <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Getting started</h2>
          <div className="mt-4 space-y-4">
            {onboardingSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Video call card */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Book an onboarding call
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Schedule a call with our team to help you get started
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Schedule time
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Page builder preview */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PlayCircle className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Try the page builder
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create beautiful landing pages with our drag-and-drop builder
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Page builder preview"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <button className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Try it out
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 