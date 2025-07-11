// components/dashboard/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Palette,
  Heart,
  Receipt,
  Users,
  Building,
  Settings,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export function Sidebar() {
  const pathname = usePathname();
  const { sessionClaims } = useAuth();
  const role = sessionClaims?.role as string;

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Widget Customizer",
      href: "/dashboard/widget/customize",
      icon: Palette,
    },
    {
      title: "Donations",
      href: "/dashboard/donations",
      icon: Heart,
    },
    {
      title: "Invoices",
      href: "/dashboard/invoices",
      icon: Receipt,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: Users,
    },
  ];

  const adminItems = [
    {
      title: "Organizations",
      href: "/admin/organizations",
      icon: Building,
    },
    {
      title: "All Widgets",
      href: "/admin/widgets",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">PassItOn</h2>
      </div>
      <nav className="px-4 pb-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {role === "super_admin" && (
          <>
            <div className="mt-8 mb-2 px-3">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Admin
              </p>
            </div>
            <ul className="space-y-1">
              {adminItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}
