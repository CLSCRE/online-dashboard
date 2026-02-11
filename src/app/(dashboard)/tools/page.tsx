import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import {
  Calculator,
  Clock,
  Coins,
  Building2,
  ExternalLink,
} from "lucide-react";

const allTools = [
  {
    slug: "hbu-land-use",
    name: "HBU Land Use Calculator",
    description: "Analyze highest and best use scenarios for land parcels",
    icon: Calculator,
    roles: ["ADMIN", "STAFF", "CLIENT"],
  },
  {
    slug: "golf-tee-time",
    name: "Golf Tee Time Booker",
    description: "Automated tee time booking status and logs",
    icon: Clock,
    roles: ["ADMIN", "STAFF"],
  },
  {
    slug: "token-tracker",
    name: "Token Tracker",
    description: "Track AI token usage and API costs",
    icon: Coins,
    roles: ["ADMIN"],
  },
  {
    slug: "la-developer-pipeline",
    name: "LA Developer Pipeline",
    description: "Los Angeles commercial real estate developer pipeline tracker",
    icon: Building2,
    roles: ["ADMIN", "STAFF"],
    external: true,
  },
];

export default async function ToolsPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "CLIENT";

  const visibleTools = allTools.filter((tool) => tool.roles.includes(role));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Tools</h1>
      <p className="mb-8 text-sm text-gray-500">
        Brokerage tools and resources
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-md bg-blue-100 p-2 transition-colors group-hover:bg-blue-200">
                <tool.icon className="text-blue-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">{tool.name}</h3>
              {"external" in tool && tool.external && (
                <ExternalLink className="ml-auto text-gray-400" size={16} />
              )}
            </div>
            <p className="text-sm text-gray-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
