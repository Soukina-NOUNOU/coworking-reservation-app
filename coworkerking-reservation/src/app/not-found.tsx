import Link from 'next/link'
import { Home } from 'lucide-react'
import BackButton from '../components/BackButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">
            <img
               src={"/not-found.jpg"}
               alt="Page not found"
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page non trouvée
          </h1>
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retourner à l'accueil
          </Link>
          
          <BackButton />
        </div>

        {/* Help text */}
        <p className="text-sm text-gray-500 mt-8">
          Si vous pensez qu'il s'agit d'une erreur, veuillez{' '}
          <Link href="/contact" className="text-blue-600 hover:text-blue-700">
            nous contacter
          </Link>.
        </p>
      </div>
    </div>
  )
}