import { createSpaceAction } from "@/app/admin/spaces/action";
import AdminCreateSpacePage from "@/components/AdminCreateSpacePage";
import Navbar from "@/components/Navbar";
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
    <>
    <Navbar/>
    <AdminCreateSpacePage types={types} />
    </>
  );
}
