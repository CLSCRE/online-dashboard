import Link from "next/link";
import { Building2, ExternalLink } from "lucide-react";

export default function LADeveloperPipelinePage() {
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

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-md bg-blue-100 p-2">
          <Building2 className="text-blue-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            LA Developer Pipeline
          </h1>
          <p className="text-sm text-gray-500">
            Los Angeles commercial real estate developer pipeline tracker
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Building2 className="text-blue-600" size={32} />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          External Application
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          The LA Developer Pipeline tracker runs as a separate application.
          Click below to open it in a new tab.
        </p>
        <a
          href="/la-developer-pipeline"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Open LA Developer Pipeline
          <ExternalLink size={16} />
        </a>
        <p className="mt-4 text-xs text-gray-400">
          Opens in a new tab. You may need to configure the pipeline app URL in
          your environment settings.
        </p>
      </div>
    </div>
  );
}
