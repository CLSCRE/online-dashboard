import { Wrench, Users, UserCircle } from "lucide-react";

interface DashboardCardsProps {
  role: string;
  userName: string | null | undefined;
}

export default function DashboardCards({ role, userName }: DashboardCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-blue-100 p-2">
            <UserCircle className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="font-semibold text-gray-900">{userName || "User"}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">Role: {role}</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-green-100 p-2">
            <Wrench className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tools</p>
            <p className="font-semibold text-gray-900">Browse available tools</p>
          </div>
        </div>
        <a
          href="/tools"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          View tools &rarr;
        </a>
      </div>

      {role === "ADMIN" && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-purple-100 p-2">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Admin</p>
              <p className="font-semibold text-gray-900">Manage users</p>
            </div>
          </div>
          <a
            href="/admin/users"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            User management &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
