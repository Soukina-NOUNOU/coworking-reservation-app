"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface SpaceGalleryProps {
  photos: string[];
  thumbnail?: string;
}

export default function SpaceGallery({ photos, thumbnail }: SpaceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Combine thumbnail and additional photos into one array
  const allImages = thumbnail ? [thumbnail, ...(photos || [])] : (photos || []);
  
  if (allImages.length === 0) {
    return (
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Aucune photo disponible</span>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? allImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="bg-white">
        {allImages.length === 1 ? (
          // Single image layout
          <div className="relative group cursor-pointer" onClick={() => openLightbox(0)}>
            <img
              src={allImages[0]}
              alt="Espace de coworking"
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <Expand className="h-6 w-6 text-gray-800" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Multiple images layout
          <div className="grid grid-cols-4 gap-2 h-96 lg:h-[500px]">
            {/* Main image (thumbnail) */}
            <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => openLightbox(0)}>
              <img
                src={allImages[0]}
                alt="Espace de coworking - Image principale"
                className="w-full h-full object-cover rounded-l-xl"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-l-xl">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Expand className="h-6 w-6 text-gray-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary images */}
            {allImages.slice(1, 5).map((photo, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => openLightbox(index + 1)}
              >
                <img
                  src={photo}
                  alt={`Espace de coworking - Image ${index + 2}`}
                  className={`w-full h-full object-cover ${
                    index === 1 ? 'rounded-tr-xl' : 
                    index === 3 ? 'rounded-br-xl' : ''
                  }`}
                />
                
                {/* Show remaining count on last image if there are more photos */}
                {index === 3 && allImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-xl">
                    <span className="text-white font-semibold text-lg">
                      +{allImages.length - 5}
                    </span>
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center ${
                  index === 1 ? 'rounded-tr-xl' : 
                  index === 3 ? 'rounded-br-xl' : ''
                }`}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Expand className="h-4 w-4 text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-screen mx-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={allImages[selectedImage]}
              alt={`Espace de coworking - Image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {selectedImage + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
