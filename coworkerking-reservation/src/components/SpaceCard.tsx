"use client";

import Link from "next/link";
import { Space } from "@/types";
import { Users, Euro, ArrowRight } from "lucide-react";

interface SpaceCardProps {
  space: Space;
}

const typeLabels: { [key: string]: string } = {
  'desk': 'Bureau individuel',
  'meeting_room': 'Salle de réunion',
  'private_office': 'Bureau privé',
};

const typeColors: { [key: string]: string } = {
  'desk': 'bg-green-100 text-green-800',
  'meeting_room': 'bg-green-100 text-green-800',
  'private_office': 'bg-purple-100 text-purple-800',
};

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="coworking-card group cursor-pointer h-[500px] flex flex-col">
      {/* Image */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        <img
          src={space.thumbnail || "/placeholder-space.jpg"}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[space.type] || 'bg-gray-100 text-gray-800'}`}>
            {typeLabels[space.type] || space.type.replace('_', ' ')}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1 text-sm font-semibold text-gray-900">
            <Euro className="h-3 w-3" />
            <span>{space.pricePerHour}</span>
            <span className="text-xs text-gray-600">/h</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {space.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-shrink-0">
          {space.description}
        </p>

        {/* Info Row */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{space.capacity} {space.capacity === 1 ? 'personne' : 'personnes'}</span>
          </div>
        </div>

        {/* Equipment Tags */}
        <div className="mb-4 flex-1">
          {space.equipments && space.equipments.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {space.equipments.slice(0, 3).map((equipment, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {equipment}
                </span>
              ))}
              {space.equipments.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                  +{space.equipments.length - 3}
                </span>
              )}
            </div>
          ) : (
            <div className="h-6"></div>
          )}
        </div>

        {/* Action Button - Always at bottom */}
        <div className="mt-auto">
          <Link 
            href={`/spaces/${space.id}`}
            className="flex items-center justify-center w-full btn-primary group-hover:bg-primary-700 transition-colors"
          >
            <span>Voir détails</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
