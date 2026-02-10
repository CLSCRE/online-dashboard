"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Wrench,
  Users,
  UserCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: string;
  userName: string | null | undefined;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "STAFF", "CLIENT"] },
  { href: "/tools", label: "Tools", icon: Wrench, roles: ["ADMIN", "STAFF", "CLIENT"] },
  { href: "/admin/users", label: "Users", icon: Users, roles: ["ADMIN"] },
  { href: "/profile", label: "Profile", icon: UserCircle, roles: ["ADMIN", "STAFF", "CLIENT"] },
];

export default function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-5">
        <h1 className="text-lg font-bold text-gray-900">CLS CRE</h1>
        <p className="text-xs text-gray-500">Online Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        <div className="mb-3 px-2">
          <p className="text-sm font-medium text-gray-900">{userName || "User"}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
