import Link from 'next/link'
import { Shield, Home } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 401 Icon */}
        <div className="mb-8">
          <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <div className="text-6xl font-bold text-gray-300 mb-4">401</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentification requise
          </h1>
          <p className="text-gray-600 mb-8">
            Vous devez être connecté pour accéder à cette page. Veuillez vous connecter pour continuer.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Se connecter
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retourner à l'accueil
          </Link>
        </div>

        {/* Help text */}
        <p className="text-sm text-gray-500 mt-8">
          Pas encore de compte ?{' '}
          <Link href="/sign-up" className="text-primary-600 hover:text-primary-700">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}