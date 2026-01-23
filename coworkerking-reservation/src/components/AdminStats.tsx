'use client';

interface AdminStatsProps {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  totalRevenue: number;
}

export default function AdminStats({
  totalUsers,
  totalSpaces,
  totalReservations,
  totalRevenue
}: Readonly<AdminStatsProps>) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 " >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistiques Globales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Users */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Utilisateurs</p>
              <p className="text-2xl font-bold text-blue-900">{totalUsers}</p>
            </div>
            <div className="text-blue-500 text-3xl">👥</div>
          </div>
        </div>

        {/* Total Spaces */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Espaces</p>
              <p className="text-2xl font-bold text-green-900">{totalSpaces}</p>
            </div>
            <div className="text-green-500 text-3xl">🏢</div>
          </div>
        </div>

        {/* Total Reservations */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Réservations</p>
              <p className="text-2xl font-bold text-purple-900">{totalReservations}</p>
            </div>
            <div className="text-purple-500 text-3xl">📅</div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-600 text-sm font-medium">Revenus</p>
              <p className="text-2xl font-bold text-indigo-900">{totalRevenue}€</p>
            </div>
            <div className="text-indigo-500 text-3xl">💰</div>
          </div>
        </div>
      </div>
    </div>
  );
}