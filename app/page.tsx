// app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to PassItOn Admin</h1>
      <div className="space-x-4">
        <Link
          href="/sign-in"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
