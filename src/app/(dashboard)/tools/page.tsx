import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import {
  Calculator,
  FileText,
  MapPin,
  BarChart3,
  Building2,
  Search,
} from "lucide-react";

const allTools = [
  {
    slug: "deal-analyzer",
    name: "Deal Analyzer",
    description: "Analyze potential CRE deals with financial modeling",
    icon: Calculator,
    roles: ["ADMIN", "STAFF", "CLIENT"],
  },
  {
    slug: "comp-search",
    name: "Comp Search",
    description: "Search comparable sales and lease transactions",
    icon: Search,
    roles: ["ADMIN", "STAFF", "CLIENT"],
  },
  {
    slug: "market-reports",
    name: "Market Reports",
    description: "View and generate market analysis reports",
    icon: BarChart3,
    roles: ["ADMIN", "STAFF", "CLIENT"],
  },
  {
    slug: "property-tracker",
    name: "Property Tracker",
    description: "Track active listings and pipeline properties",
    icon: Building2,
    roles: ["ADMIN", "STAFF"],
  },
  {
    slug: "document-generator",
    name: "Document Generator",
    description: "Generate LOIs, proposals, and offering memorandums",
    icon: FileText,
    roles: ["ADMIN", "STAFF"],
  },
  {
    slug: "mapping",
    name: "Mapping Tool",
    description: "Interactive property mapping and area analysis",
    icon: MapPin,
    roles: ["ADMIN", "STAFF"],
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
            </div>
            <p className="text-sm text-gray-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
