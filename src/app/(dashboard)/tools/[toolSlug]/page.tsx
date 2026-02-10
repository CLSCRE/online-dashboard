import { Wrench } from "lucide-react";
import Link from "next/link";

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ToolPage({ params }: { params: { toolSlug: string } }) {
  const toolName = formatSlug(params.toolSlug);

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/tools"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Wrench className="text-blue-600" size={32} />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">{toolName}</h1>
        <p className="text-gray-500">
          This tool is coming soon. Check back for updates.
        </p>
      </div>
    </div>
  );
}
