import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>&copy; {currentYear} <span className="bg-yellow-100 px-2 py-1 rounded border-2 border-yellow-400 text-yellow-800 font-semibold">[BANYAN LABS LEGAL NAME]</span>. All rights reserved.</span>
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

        {/* Company Branding */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Powered by</span>
          <span className="font-semibold text-blue-600 bg-yellow-100 px-2 py-1 rounded border-2 border-yellow-400">[BANYAN LABS BRAND NAME]</span>
        </div>
      </div>
    </footer>
  );
}