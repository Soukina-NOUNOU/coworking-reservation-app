"use client";

import { deleteAccountAction } from "@/serverAction/userAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const onSave = async () => {
    setLoading(true);
    try {
      await deleteAccountAction();
      setOpen(false);
      router.push('/');
      toast.success("Compte supprimé avec succès !");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Une erreur est survenue lors de la suppression du compte. Veuillez réessayer.");
      setOpen(false);
    } finally {
      setLoading(false);    
    }
  }

  return (
    <>
      {/* Bouton rouge */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
      >
        Supprimer mon compte
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Confirmer la suppression
            </h2>

            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer votre compte ?  
              Cette action est irréversible.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>

              <form action={onSave} onSubmit={() => setOpen(false)}>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Confirmer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
