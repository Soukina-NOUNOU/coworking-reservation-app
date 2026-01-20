"use client";

import SpaceCard from "@/components/SpaceCard";
import Navbar from "@/components/Navbar";
import { Space } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

interface SpaceListProps {
  spaces: Space[];
}

export default function SpaceList({ spaces }: SpaceListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter spaces based on search and type
  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || space.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const spaceTypes = [
    { value: "all", label: "Tous les types" },
    { value: "desk", label: "Bureau individuel" },
    { value: "meeting_room", label: "Salle de réunion" },
    { value: "private_office", label: "Bureau privé" },
  ];

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Espaces disponibles
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos espaces de coworking modernes et réservez celui qui correspond à vos besoins.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un espace..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="w-full lg:w-auto">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full lg:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {spaceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-gray-600">
              {filteredSpaces.length} espace{filteredSpaces.length !== 1 ? 's' : ''} trouvé{filteredSpaces.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="py-12">
        <div className="container">
          {filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun espace trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
