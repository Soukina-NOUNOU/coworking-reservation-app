'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  const getErrorMessage = (error: Error) => {
    if (error.message.includes('Unauthorized')) {
      return {
        title: 'Accès non autorisé (401)',
        message: 'Vous devez être connecté pour accéder à cette page.',
        action: 'Se connecter'
      }
    }
    
    if (error.message.includes('Forbidden')) {
      return {
        title: 'Accès interdit (403)', 
        message: 'Vous n\'avez pas les permissions nécessaires pour accéder à cette ressource.',
        action: 'Retourner à l\'accueil'
      }
    }

    return {
      title: 'Une erreur est survenue (500)',
      message: 'Une erreur inattendue s\'est produite. Nos équipes ont été notifiées.',
      action: 'Réessayer'
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {errorInfo.title}
          </h1>
          <p className="text-gray-600 mb-8">
            {errorInfo.message}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {errorInfo.action}
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retourner à l'accueil
          </Link>
        </div>

        {/* Error details for development */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <summary className="cursor-pointer text-red-700 font-medium">
              Détails de l'erreur (développement)
            </summary>
            <pre className="mt-2 text-sm text-red-600 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-red-500">
                Digest: {error.digest}
              </p>
            )}
          </details>
        )}
      </div>
    </div>
  )
}