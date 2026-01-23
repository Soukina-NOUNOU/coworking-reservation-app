"use client";

import Link from "next/link";
import { Space } from "@/types";
import { Users, Euro, Calendar, MapPin, Wifi, Coffee, Shield, Clock, UserPlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import SpaceGallery from "./SpaceGallery";

interface SpaceDetailsProps {
  space: Space;
}

const typeLabels: { [key: string]: string } = {
  'desk': 'Bureau individuel',
  'meeting_room': 'Salle de réunion',
  'private_office': 'Bureau privé',
};

const equipmentIcons: { [key: string]: any } = {
  'Wi-Fi': Wifi,
  'WiFi': Wifi,
  'Café': Coffee,
  'Coffee': Coffee,
  'Sécurité': Shield,
  'Security': Shield,
  'default': Clock,
};

export default function SpaceDetails({ space }: SpaceDetailsProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              {space.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {space.description}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <div className="bg-primary-50 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Euro className="h-6 w-6 text-primary-600 mr-1" />
                <span className="text-3xl font-bold text-primary-600">{space.pricePerHour}</span>
                <span className="text-lg text-gray-500 ml-1">/heure</span>
              </div>
              <p className="text-sm text-gray-600">Tarif horaire</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-8">
        <SpaceGallery 
          photos={space.photos || []} 
          thumbnail={space.thumbnail}
        />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Type d'espace</h3>
              <p className="text-gray-600">{typeLabels[space.type] || space.type.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Capacité</h3>
              <p className="text-gray-600">{space.capacity} {space.capacity === 1 ? 'personne' : 'personnes'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Disponibilité</h3>
              <p className="text-gray-600">7j/7 - 9h-17h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      {space.equipments && space.equipments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
            Équipements inclus
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {space.equipments.map((equipment, index) => {
              const Icon = equipmentIcons[equipment] || equipmentIcons.default;
              return (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{equipment}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-50 to-green-50 rounded-2xl p-8 text-center">
        {isSignedIn ? (
          <>
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
              Prêt à réserver cet espace ?
            </h3>
            <p className="text-gray-600 mb-6">
              Consultez les créneaux disponibles et réservez en quelques clics.
            </p>
            <Link 
              href={`/spaces/${space.id}/availabilities`}
              className="btn-primary text-lg px-8 py-3"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Voir les disponibilités
            </Link>
          </>
        ) : (
          <>
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
              Inscrivez-vous pour réserver
            </h3>
            <p className="text-gray-600 mb-6">
              Créez votre compte pour accéder aux réservations et profiter de nos espaces.
            </p>
            <Link 
              href="/sign-up"
              className="btn-primary text-lg px-8 py-3"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
