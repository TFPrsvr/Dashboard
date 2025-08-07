"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw, ArrowLeft, Home } from "lucide-react";

interface ErrorPageProps {
  title: string;
  message: string;
  actions?: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
  }>;
}

export function ErrorPage({ title, message, actions }: ErrorPageProps) {
  const router = useRouter();

  const defaultActions = [
    { label: "Go to Dashboard", onClick: () => router.push("/dashboard") },
    { label: "Go Back", onClick: () => router.back() },
    { label: "Refresh Page", onClick: () => window.location.reload() }
  ];

  const displayActions = actions || defaultActions;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="space-y-3">
          {displayActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick || (() => {
                if (action.href) {
                  router.push(action.href);
                }
              })}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                index === 0 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact support at{" "}
            <a href="mailto:support@passiton.com" className="text-blue-600 hover:underline">
              support@passiton.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}