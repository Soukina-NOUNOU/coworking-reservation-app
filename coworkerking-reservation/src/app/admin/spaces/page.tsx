import { createSpaceAction } from "@/app/admin/spaces/action";
import { getCurrentUser } from "@/controller/userController";
import { getSpaceTypes } from "@/serverAction/spaceAction";


export default async function AdminSpacesPage() {
  const user = await getCurrentUser();
  const types = await getSpaceTypes();

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        Accès refusé, vous n'avez pas les permissions nécessaires.
        Rapprochez vous de l'administrateur du site.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-8">Créer un espace</h1>

      <form action={createSpaceAction} className="space-y-6">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            name="name"
            required
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
            className="w-full border rounded px-3 py-2"
            placeholder="Décrivez l’espace..."
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
            className="w-full border rounded px-3 py-2"
            placeholder="TV, WiFi, Tableau blanc..."
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image principale (thumbnail)
          </label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            required
            className="w-full"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photos supplémentaires
          </label>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Créer l’espace
        </button>
      </form>
    </div>
  );
}
