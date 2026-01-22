import Link from 'next/link'
import { ShieldX, Home } from 'lucide-react'
import BackButton from '@/components/BackButton'

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 403 Icon */}
        <div className="mb-8">
          <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-6xl font-bold text-gray-300 mb-4">403</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès interdit
          </h1>
          <p className="text-gray-600 mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette ressource. 
            Contactez un administrateur si vous pensez qu'il s'agit d'une erreur.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retourner à l'accueil
          </Link>
          
          <BackButton />
        </div>

        {/* Help text */}
        <p className="text-sm text-gray-500 mt-8">
          Besoin d'aide ?{' '}
          <Link href="/contact" className="text-primary-600 hover:text-primary-700">
            Contactez le support
          </Link>
        </p>
      </div>
    </div>
  )
}