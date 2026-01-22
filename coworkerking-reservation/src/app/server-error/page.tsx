import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'
import RefreshButton from '@/components/RefreshButton'

export default function InternalServerError() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 500 Icon */}
        <div className="mb-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-6xl font-bold text-gray-300 mb-4">500</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erreur serveur interne
          </h1>
          <p className="text-gray-600 mb-8">
            Une erreur inattendue s'est produite sur nos serveurs. 
            Nos équipes ont été automatiquement notifiées et travaillent à résoudre le problème.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <RefreshButton />
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retourner à l'accueil
          </Link>
        </div>

        {/* Status and help */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Status du service :</strong> Incident en cours
          </p>
          <p className="text-sm text-blue-600">
            Suivez les mises à jour sur notre{' '}
            <Link href="/status" className="underline hover:no-underline">
              page de statut
            </Link>{' '}
            ou{' '}
            <Link href="/contact" className="underline hover:no-underline">
              contactez le support
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}