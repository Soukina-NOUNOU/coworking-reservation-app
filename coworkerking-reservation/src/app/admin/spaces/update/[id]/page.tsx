import { updateSpaceAction } from "@/app/admin/spaces/actions";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/controller/userController";
import { getSpace } from "@/controller/spaceController";
import { getSpaceTypes } from "@/serverAction/spaceAction";
import { AuthError, ForbiddenError, NotFoundError } from "@/lib/errors";
import AdminUnauthorized from "@/app/admin/unauthorized/page";
import NotFound from "@/app/not-found";
import Forbidden from "@/app/forbidden/page";

interface UpdateSpacePageProps {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
}

export default async function UpdateSpacePage({ params }: UpdateSpacePageProps) {
  const resolvedParams = await Promise.resolve(params);
  
  let user;
  let space;
  let types;
  
  try {
    user = await getCurrentUser();
    
    if (!user || user.role !== "ADMIN") {
      return <AdminUnauthorized />;
    }
    
    space = await getSpace(resolvedParams.id);
    types = await getSpaceTypes();
    
    if (!space) {
      return <NotFound />;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return <AdminUnauthorized />;
    }
    else if (error instanceof ForbiddenError) {
      return <Forbidden />;
    }
    if (error instanceof NotFoundError) {
       return <NotFound/> 
    }
    throw error;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-16 p-8 bg-white shadow rounded">
        <h1 className="text-3xl font-bold mb-8">{`Modifier l'espace: ${space.name.toUpperCase()}`}</h1>

        <form action={updateSpaceAction} className="space-y-6">
          <input type="hidden" name="id" value={space.id} />
          
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              name="name"
              required
              defaultValue={space.name}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: Salle de réunion"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              defaultValue={space.description}
              className="w-full border rounded px-3 py-2"
              placeholder="Décrivez l'espace..."
              rows={4}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              required
              defaultValue={space.type}
              className="w-full border rounded px-3 py-2"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === 'desk' && 'Bureau'}
                  {type === 'meeting_room' && 'Salle de réunion'}
                  {type === 'private_office' && 'Bureau privé'}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacité
            </label>
            <input
              type="number"
              name="capacity"
              required
              defaultValue={space.capacity}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: 10"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix par heure (€)
            </label>
            <input
              type="number"
              name="pricePerHour"
              required
              defaultValue={space.pricePerHour}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: 25"
            />
          </div>

          {/* Equipements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Équipements (séparés par des virgules)
            </label>
            <input
              name="equipments"
              defaultValue={space.equipments.join(', ')}
              className="w-full border rounded px-3 py-2"
              placeholder="TV, WiFi, Tableau blanc..."
            />
          </div>

          {/* Current thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image principale actuelle
            </label>
            <img 
              src={space.thumbnail} 
              alt="Thumbnail actuelle" 
              className="w-32 h-32 object-cover rounded mb-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nouvelle image principale (optionnel)
            </label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              className="w-full"
            />
          </div>

          {/* Current photos */}
          {space.photos.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photos actuelles
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {space.photos.map((photo, index) => (
                  <img 
                    key={index}
                    src={photo} 
                    alt={`Photo ${index + 1}`} 
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ajouter de nouvelles photos (optionnel)
            </label>
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Mettre à jour l'espace
            </button>
            <a
              href={`/spaces/${space.id}`}
              className="flex-1 text-center bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
            >
              Annuler
            </a>
          </div>
        </form>
      </div>
    </>
  );
}