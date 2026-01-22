'use client'

import { RefreshCw } from 'lucide-react'

export default function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
    >
      <RefreshCw className="w-5 h-5 mr-2" />
      Recharger la page
    </button>
  )
}