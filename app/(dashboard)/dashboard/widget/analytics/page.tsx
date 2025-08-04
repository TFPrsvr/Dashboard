export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Widget Analytics</h1>
        <p className="text-gray-600 mt-2">
          Track your donation widget performance and engagement metrics.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Analytics Dashboard Coming Soon
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                We&apos;re building a comprehensive analytics dashboard that will include:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Real-time donation tracking</li>
                <li>Conversion rate analysis</li>
                <li>Geographic performance data</li>
                <li>Time-based trends and patterns</li>
                <li>Donor engagement metrics</li>
              </ul>
              <p className="mt-2">
                For now, you can view basic donation data in the{' '}
                <a href="/dashboard/donations" className="underline font-medium">
                  Donations section
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-green-600">--</p>
          <p className="text-sm text-gray-500">Coming soon</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-blue-600">--%</p>
          <p className="text-sm text-gray-500">Coming soon</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Average Amount</h3>
          <p className="text-3xl font-bold text-purple-600">$--</p>
          <p className="text-sm text-gray-500">Coming soon</p>
        </div>
      </div>
    </div>
  );
}