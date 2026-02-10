import { prisma } from "@/lib/db";
import UsersTable from "@/components/UsersTable";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">User Management</h1>
      <p className="mb-8 text-sm text-gray-500">Create and manage user accounts</p>
      <UsersTable initialUsers={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}
