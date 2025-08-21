import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>&copy; {currentYear} All rights reserved.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link 
            href="/policies/terms" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            href="/policies/privacy" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/policies/data-processing" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Data Processing
          </Link>
        </div>

      </div>
    </footer>
  );
}