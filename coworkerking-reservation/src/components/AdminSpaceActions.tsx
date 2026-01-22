"use client";

import { deleteSpaceAction } from "@/app/admin/spaces/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AdminSpaceActionsProps {
  spaceId: string;
  spaceName: string;
}

export default function AdminSpaceActions({ spaceId, spaceName }: AdminSpaceActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteSpaceAction(spaceId);
      router.push("/spaces");
      toast.success(`L'espace a été supprimé avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-yellow-800">Panneau Administrateur</h3>
          <p className="text-xs text-yellow-600">Actions de gestion pour cet espace</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/admin/spaces/update/${spaceId}`}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            ✏️ Modifier
          </a>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-red-600 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer l'espace <strong>"{spaceName}"</strong> ?
              <br />
              <span className="text-red-600 text-sm">
                Cette action est irréversible et supprimera également toutes les réservations associées.
              </span>
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}