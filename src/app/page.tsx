'use client';

import ClientForm from './components/ClientForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md shadow-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important Pricing Information</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>The base price quote you received is for a standard 3-page website. Additional pages and special features (such as e-commerce, custom functionality, or content management systems) will affect the final price.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Onboarding Forms</h1>
            <p className="text-gray-900">
              Please fill out this form to help us understand your website needs and requirements.
              This information will help us create a website that perfectly matches your vision.
            </p>
          </div>
          
          <ClientForm />
        </div>
      </div>
    </main>
  );
}
