'use client';

export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Style Test Page</h1>
        
        {/* Test Tailwind Classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 1</h2>
            <p className="text-gray-600">This is a test card to verify Tailwind CSS is working.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Test Button
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Gradient Card</h2>
            <p>Testing gradient backgrounds and text colors.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Success Card</h2>
            <p className="text-green-600">Testing success colors and borders.</p>
          </div>
        </div>

        {/* Test Atomic Design Components */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Atomic Design Test</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Badge Test
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Success
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Error
              </span>
            </div>
            
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Primary Button
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                Secondary Button
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Outline Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
