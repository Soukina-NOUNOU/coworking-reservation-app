import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function MePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              Mon Profil
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-lg text-gray-900">
                  {user.primaryEmailAddress?.emailAddress || "Non renseigné"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Prénom
                  </label>
                  <p className="text-lg text-gray-900">
                    {user.firstName || "Non renseigné"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nom
                  </label>
                  <p className="text-lg text-gray-900">
                    {user.lastName || "Non renseigné"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Compte créé le
                </label>
                <p className="text-lg text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
