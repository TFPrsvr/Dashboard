// app/layout.tsx
"use client";
import { ClerkProvider } from "@clerk/nextjs";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      {children}
    </ClerkProvider>
  );
}
