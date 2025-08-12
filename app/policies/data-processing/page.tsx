import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Processing Agreement - PassItOn Admin',
  description: 'Data Processing Agreement for the PassItOn Admin platform',
};

export default function DataProcessingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Data Processing Agreement</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <iframe 
              src="/docs/policies/data-processing-agreement.md"
              className="w-full h-[800px] border-0"
              title="Data Processing Agreement"
            />
          </div>
        </div>
      </div>
    </div>
  );
}