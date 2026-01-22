import AdminUnauthorized from "@/app/admin/unauthorized/page";
import AdminCreateSpacePage from "@/components/AdminCreateSpacePage";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/controller/userController";
import { getSpaceTypes } from "@/serverAction/spaceAction";


export default async function AdminSpacesPage() {
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
    <AdminCreateSpacePage types={types} />
    </>
  );
}
