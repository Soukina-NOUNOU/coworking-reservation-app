import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mb-6">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Chargement en cours...
        </h2>
        
        <p className="text-gray-600">
          Veuillez patienter pendant que nous préparons votre contenu.
        </p>
        
        {/* Animated dots */}
        <div className="flex justify-center items-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}