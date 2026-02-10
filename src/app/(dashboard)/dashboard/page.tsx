import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardCards from "@/components/DashboardCards";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mb-8 text-sm text-gray-500">
        Welcome back, {session?.user?.name || "User"}
      </p>
      <DashboardCards
        role={session?.user?.role || "CLIENT"}
        userName={session?.user?.name}
      />
    </div>
  );
}
