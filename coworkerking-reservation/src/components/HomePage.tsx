import Link from "next/link";
import Navbar from "../components/Navbar";
import { ArrowRight, Users, Calendar, Wifi, Coffee, Shield, Clock } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: "Espaces collaboratifs",
      description: "Des espaces conçus pour favoriser la créativité et la collaboration",
    },
    {
      icon: Calendar,
      title: "Réservation simple",
      description: "Réservez votre espace en quelques clics, 24h/24 et 7j/7",
    },
    {
      icon: Wifi,
      title: "Connexion haut débit",
      description: "WiFi fibre optique gratuit dans tous nos espaces",
    },
    {
      icon: Coffee,
      title: "Services inclus",
      description: "Café, thé, et collations disponibles toute la journée",
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Accès sécurisé et espaces surveillés 24h/24",
    },
    {
      icon: Clock,
      title: "Flexibilité",
      description: "Horaires flexibles adaptés à votre rythme de travail",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              Votre espace de travail
              <span className="block text-green-300">idéal vous attend</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Réservez facilement des espaces de coworking modernes, 
              équipés et inspirants pour booster votre productivité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/spaces" className="btn-primary text-lg px-8 py-3">
                Découvrir nos espaces
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/register" className="btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-3">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Pourquoi choisir CoworkSpace ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous offrons bien plus qu'un simple espace de travail. 
              Découvrez un écosystème complet pour votre réussite.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              Prêt à transformer votre façon de travailler ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez des centaines de professionnels qui ont déjà choisi CoworkSpace 
              pour développer leurs projets dans un environnement stimulant.
            </p>
            <Link href="/spaces" className="btn-primary text-lg px-8 py-3">
              Réserver maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
