'use client';
import { createSpaceAction } from "@/app/admin/spaces/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


interface CreateSpaceFormData {
    types: string[];
}

export default function AdminCreateSpacePage(props: Readonly<CreateSpaceFormData>) {
    const { types } = props;
    const router = useRouter();

    const onSave = async (data: FormData) => {
        try {
            await createSpaceAction(data);
            router.push('/spaces');
            toast.success("L'espace a été créé avec succès.");
        } catch (error) {
            console.error("Erreur lors de la création de l'espace:", error);
            toast.error("Erreur lors de la création de l'espace");
        }
    }

    return(
        <div className="max-w-4xl mx-auto mt-16 p-8">
            {/* Instructions */}
            <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded mb-8">
                <h3 className="font-semibold text-primary-800 mb-2">Instructions</h3>
                <ul className="text-sm text-primary-700 space-y-1">
                <li>• Pour <strong>modifier</strong> ou <strong>supprimer</strong> un espace, rendez-vous sur la page de l'espace en question</li>
                <li>• Les boutons d'administration apparaîtront automatiquement en haut de la page</li>
                <li>• Seuls les administrateurs peuvent voir et utiliser ces fonctionnalités</li>
                </ul>
            </div>
            {/* Navigation buttons */}
            <div className="mb-8 flex gap-4">
                <a
                href="/spaces"
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                >
                ← Voir tous les espaces
                </a>
                <div className="flex-1"></div>
                <h1 className="text-3xl font-bold text-center">Panneau Administrateur - Espaces</h1>
                <div className="flex-1"></div>
            </div>

            {/* Create Space Form */}
            <div className="bg-white shadow rounded p-8">
                <h2 className="text-2xl font-bold mb-6">Créer un nouvel espace</h2>

            <form action={onSave} className="space-y-6">
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
                className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
                >
                Créer l'espace
                </button>
            </form>
            </div>

      
    </div>
    )
}