import Link from "next/link";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";

interface BookingEntry {
  date: string;
  course: string;
  time: string;
  players: number;
  status: "confirmed" | "failed" | "pending";
  message?: string;
}

async function getBookingLog(): Promise<BookingEntry[]> {
  const logPath = path.join(process.cwd(), "data", "golf-bookings.json");
  try {
    const data = await fs.readFile(logPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
        <CheckCircle2 size={12} />
        Confirmed
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
        <XCircle size={12} />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
      <AlertCircle size={12} />
      Pending
    </span>
  );
}

export default async function GolfTeeTimePage() {
  const bookings = await getBookingLog();
  const lastBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;
  const recentBookings = bookings.slice(-10).reverse();

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
          <Clock className="text-blue-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Golf Tee Time Booker
          </h1>
          <p className="text-sm text-gray-500">
            Automated tee time booking status and history
          </p>
        </div>
      </div>

      {/* Last Booking Status Card */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Last Booking
        </h2>
        {lastBooking ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Date
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {lastBooking.date}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Course
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {lastBooking.course}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Tee Time
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {lastBooking.time}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Status
              </p>
              <StatusBadge status={lastBooking.status} />
            </div>
            {lastBooking.message && (
              <div className="sm:col-span-2 lg:col-span-4">
                <p className="text-xs font-medium uppercase text-gray-400">
                  Message
                </p>
                <p className="text-sm text-gray-600">{lastBooking.message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-md bg-gray-50 p-8 text-center">
            <Clock className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-sm text-gray-500">
              No bookings recorded yet. The booking log will appear here once the
              automation runs.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Place booking data in{" "}
              <code className="rounded bg-gray-200 px-1">
                data/golf-bookings.json
              </code>
            </p>
          </div>
        )}
      </div>

      {/* Recent Bookings Table */}
      {recentBookings.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Bookings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Course
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">Time</th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Players
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">{booking.date}</td>
                    <td className="px-6 py-3 text-gray-900">
                      {booking.course}
                    </td>
                    <td className="px-6 py-3 text-gray-900">{booking.time}</td>
                    <td className="px-6 py-3 text-gray-900">
                      {booking.players}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
