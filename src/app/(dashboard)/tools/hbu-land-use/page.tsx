import Link from "next/link";
import { Calculator } from "lucide-react";

export default function HBULandUsePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="text-sm text-blue-600 hover:underline"
          >
            &larr; Back to Tools
          </Link>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-md bg-blue-100 p-2">
          <Calculator className="text-blue-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            HBU Land Use Calculator
          </h1>
          <p className="text-sm text-gray-500">
            Analyze highest and best use scenarios for land parcels in Los
            Angeles, CA
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <iframe
          src="/hbu-calculator.html"
          className="h-full w-full border-0"
          style={{ minHeight: "800px" }}
          title="HBU Land Use Calculator"
        />
      </div>
    </div>
  );
}
