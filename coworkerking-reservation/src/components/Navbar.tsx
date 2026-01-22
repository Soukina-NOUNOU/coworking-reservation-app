"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Calendar, User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getCurrentUserAction } from "@/serverAction/userAction";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        const fetchedUser = await getCurrentUserAction();
        setUser(fetchedUser);
        setLoading(false);
        
        // If no user and we haven't exceeded retries, try again after a delay
        if (!fetchedUser && retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchUser, 1000 * retryCount); // Exponential backoff
        }
      } catch (error) {
        console.log('Error fetching user in Navbar:', error);
        setLoading(false);
        
        // Retry on error
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchUser, 1000 * retryCount);
        }
      }
    };
    
    fetchUser();
  }, []);

  const navigation = [
    { name: 'Espaces', href: '/spaces', icon: Calendar },
    { name: 'Mes Réservations', href: '/reservations', icon: Calendar },
    { name: 'Mon Profil', href: '/me', icon: User },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CW</span>
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              CoworkSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SignedIn>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              {user && user.role === "ADMIN" && (
                <a href="/admin/spaces" className="text-white bg-primary-700 px-3 py-1 rounded hover:bg-primary-700" > Admin </a>
              )}
            </SignedIn>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-outline">
                  Connexion
                </button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl="/sign-up">
                <button className="btn-primary">
                  Inscription
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <SignedIn>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </SignedIn>
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className="block w-full text-center btn-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connexion
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl="/sign-up">
                    <button
                      className="block w-full text-center btn-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inscription
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center py-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
