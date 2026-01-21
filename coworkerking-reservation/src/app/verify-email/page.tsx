import Navbar from '@/components/Navbar';
import { Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MagicLinkSentPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Vérifiez votre email
            </h2>
            <p className="mt-4 text-gray-600">
              Nous avons envoyé un lien de connexion magique à votre adresse email.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Étapes suivantes :</h3>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>1. Consultez votre boîte de réception</li>
                  <li>2. Cliquez sur le lien dans l'email</li>
                  <li>3. Vous serez connecté automatiquement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas reçu l'email ?{' '}
              <Link href="/sign-in" className="text-green-600 hover:text-green-500 font-medium">
                Réessayer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}