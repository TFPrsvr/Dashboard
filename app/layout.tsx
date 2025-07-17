// app/layout.tsx
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export const metadata = {
  title: "PassItOn Admin",
  description: "Admin portal for PassItOn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <header className="p-4 border-b">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn ml-2">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
