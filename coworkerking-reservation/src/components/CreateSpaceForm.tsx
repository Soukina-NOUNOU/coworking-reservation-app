'use client';
import { createSpaceAction } from "@/app/admin/spaces/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";

interface CreateSpaceFormProps {
  types: string[];
}

export default function CreateSpaceForm({ types }: CreateSpaceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<FileList | null>(null);
  console.log(selectedThumbnail);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required thumbnail
    if (!selectedThumbnail) {
      toast.error("L'image principale est obligatoire");
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    setIsSubmitting(true);
    try {
      await createSpaceAction(formData);
      router.push('/spaces');
      toast.success("L'espace a été créé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création de l'espace:", error);
      toast.error("Erreur lors de la création de l'espace");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedThumbnail(file!);
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedPhotos(files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
        <Link
          href="/admin/spaces"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition"
        >
            🔙 Retour au dashboard Administrateur
        </Link>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              Informations de base
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'espace *
                </label>
                <input
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="Ex: Salle de réunion Executive"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="Décrivez l'espace, ses avantages et caractéristiques..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'espace *
                </label>
                <select
                  name="type"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                >
                  <option value="">Sélectionnez un type</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'desk' && 'Bureau individuel'}
                      {type === 'meeting_room' && 'Salle de réunion'}
                      {type === 'private_office' && 'Bureau privé'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details & Pricing */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              Détails et tarification
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacité *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="capacity"
                      required
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="Ex: 8"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">personnes</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix par heure *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pricePerHour"
                      required
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="Ex: 25"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">€/h</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements
                </label>
                <input
                  name="equipments"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="Ex: TV 65'', WiFi, Tableau blanc, Système audio..."
                />
                <p className="text-sm text-gray-500 mt-1">Séparez les équipements par des virgules</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
          Images
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image principale *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition">
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                id="thumbnail-upload"
                onChange={handleThumbnailChange}
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {selectedThumbnail ? (
                  <div>
                    <div className="text-green-500 text-4xl mb-2">✅</div>
                    <p className="text-sm text-green-600 font-medium">{selectedThumbnail.name}</p>
                    <p className="text-xs text-gray-400 mt-1">Cliquez pour changer</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-400 text-4xl mb-2">📸</div>
                    <p className="text-sm text-gray-600">Cliquez pour ajouter une image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos supplémentaires
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition">
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="hidden"
                id="photos-upload"
                onChange={handlePhotosChange}
              />
              <label htmlFor="photos-upload" className="cursor-pointer">
                {selectedPhotos && selectedPhotos.length > 0 ? (
                  <div>
                    <div className="text-green-500 text-4xl mb-2">✅</div>
                    <p className="text-sm text-green-600 font-medium">
                      {selectedPhotos.length} image{selectedPhotos.length > 1 ? 's' : ''} sélectionnée{selectedPhotos.length > 1 ? 's' : ''}
                    </p>
                    <div className="text-xs text-gray-500 mt-2 space-y-1 max-h-20 overflow-y-auto">
                      {Array.from(selectedPhotos).map((file, index) => (
                        <div key={index} className="truncate">{file.name}</div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Cliquez pour changer</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-400 text-4xl mb-2">🖼️</div>
                    <p className="text-sm text-gray-600">Ajoutez plusieurs images</p>
                    <p className="text-xs text-gray-400 mt-1">Optionnel - Galerie d'images</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Création en cours...
            </span>
          ) : (
            '✨ Créer l\'espace'
          )}
        </button>
        
        <Link
          href="/admin/spaces"
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition font-medium text-center"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}