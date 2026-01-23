import { SignUp } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';

export default function SignUpPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">

          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Créer votre compte
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Entrez votre email pour recevoir un lien de vérification
            </p>
          </div>

          <div className="flex justify-center">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-sm',
                  card: 'shadow-lg border-0',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                  dividerLine: 'bg-gray-300',
                  dividerText: 'text-gray-500 text-sm',
                  formFieldInput: 'border-gray-300 focus:border-green-500 focus:ring-green-500',
                  footerActionLink: 'text-green-600 hover:text-green-500',
                },
                layout: {
                  socialButtonsPlacement: 'bottom'
                }
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}