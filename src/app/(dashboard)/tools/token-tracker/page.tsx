import Link from "next/link";
import { Coins, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";

interface TokenUsage {
  date: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
}

interface UsageSummary {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCost: number;
  entries: TokenUsage[];
}

async function getUsageData(): Promise<UsageSummary> {
  const dataPath = path.join(process.cwd(), "data", "token-usage.json");
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const entries: TokenUsage[] = JSON.parse(data);
    const totalInputTokens = entries.reduce((sum, e) => sum + e.inputTokens, 0);
    const totalOutputTokens = entries.reduce(
      (sum, e) => sum + e.outputTokens,
      0
    );
    const totalCost = entries.reduce((sum, e) => sum + e.cost, 0);
    return { totalInputTokens, totalOutputTokens, totalCost, entries };
  } catch {
    return {
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalCost: 0,
      entries: [],
    };
  }
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default async function TokenTrackerPage() {
  const usage = await getUsageData();
  const recentEntries = usage.entries.slice(-20).reverse();

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
          <Coins className="text-blue-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Token Tracker</h1>
          <p className="text-sm text-gray-500">
            AI token usage and API cost tracking
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-green-100 p-2">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Input Tokens
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatNumber(usage.totalInputTokens)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-blue-100 p-2">
              <TrendingDown className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Output Tokens
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatNumber(usage.totalOutputTokens)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-amber-100 p-2">
              <DollarSign className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Total Cost
              </p>
              <p className="text-xl font-bold text-gray-900">
                ${usage.totalCost.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Table */}
      {recentEntries.length > 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Usage
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Model
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Input
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Output
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentEntries.map((entry, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">{entry.date}</td>
                    <td className="px-6 py-3">
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {entry.model}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {formatNumber(entry.inputTokens)}
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {formatNumber(entry.outputTokens)}
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      ${entry.cost.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
          <Coins className="mx-auto mb-3 text-gray-400" size={32} />
          <p className="text-sm text-gray-500">
            No usage data recorded yet. Token usage will appear here once data is
            available.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Place usage data in{" "}
            <code className="rounded bg-gray-200 px-1">
              data/token-usage.json
            </code>
          </p>
        </div>
      )}
    </div>
  );
}
