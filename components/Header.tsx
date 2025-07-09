"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import OrgSelector from "./OrgSelector";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        PassItOn Admin
      </Link>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <OrgSelector />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="text-blue-600">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-blue-600">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </header>
  );
}
