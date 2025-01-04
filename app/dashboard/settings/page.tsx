'use client'

import { useState } from 'react'
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Globe,
  Mail,
  Shield,
  Zap,
  Users,
} from 'lucide-react'

const settingsSections = [
  {
    id: 'account',
    name: 'Account Settings',
    icon: User,
    description: 'Manage your account information and preferences',
  },
  {
    id: 'security',
    name: 'Security',
    icon: Lock,
    description: 'Update your password and security settings',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive notifications',
  },
  {
    id: 'billing',
    name: 'Billing & Plans',
    icon: CreditCard,
    description: 'Manage your subscription and payment methods',
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Zap,
    description: 'Connect with other services and tools',
  },
  {
    id: 'team',
    name: 'Team Members',
    icon: Users,
    description: 'Manage team access and permissions',
  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Side navigation */}
        <nav className="space-y-1 lg:w-64">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
                activeSection === section.id
                  ? 'bg-gray-50 text-indigo-600'
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
            >
              <section.icon
                className={`h-6 w-6 ${
                  activeSection === section.id
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              />
              <span>{section.name}</span>
            </button>
          ))}
        </nav>

        {/* Main content area */}
        <div className="flex-1 space-y-6">
          {/* Account Settings Form */}
          {activeSection === 'account' && (
            <div className="space-y-6">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Profile Information
                  </h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save changes
                  </button>
                </div>
              </div>

              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Delete account
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Once you delete your account, you will lose all data
                      associated with it.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would be conditionally rendered here */}
        </div>
      </div>
    </div>
  )
} 