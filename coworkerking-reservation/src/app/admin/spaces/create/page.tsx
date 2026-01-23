import AdminUnauthorized from "@/app/admin/unauthorized/page";
import CreateSpaceForm from "@/components/CreateSpaceForm";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/controller/userController";
import { getSpaceTypes } from "@/serverAction/spaceAction";

export default async function AdminCreateSpacePage() {
  const user = await getCurrentUser();
  const types = await getSpaceTypes();

  if (!user || user.role !== "ADMIN") {
    return (
        <AdminUnauthorized />
    );
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Créer un nouvel espace</h1>
                  <p className="text-primary-100 mt-2">Ajoutez un nouvel espace de coworking à la plateforme</p>
                </div>
                <div className="text-white text-5xl opacity-20">
                  🏢
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <CreateSpaceForm types={types} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}