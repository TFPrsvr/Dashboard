"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <nav className="w-64 bg-white p-4 space-y-2">
        <Link href="/dashboard" className="block hover:bg-gray-100 rounded p-2">
          Overview
        </Link>
        <Link
          href="/dashboard/settings"
          className="block hover:bg-gray-100 rounded p-2"
        >
          Settings
        </Link>
        <Link
          href="/dashboard/stripe"
          className="block hover:bg-gray-100 rounded p-2"
        >
          Stripe
        </Link>
        <Link
          href="/dashboard/users"
          className="block hover:bg-gray-100 rounded p-2"
        >
          Users
        </Link>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
