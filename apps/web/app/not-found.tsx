import Link from 'next/link';
import { APP_TEXT } from '@aidonic/shared-utils';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          {APP_TEXT.errors.pageNotFound}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {APP_TEXT.navigation.goBackHome}
        </Link>
      </div>
    </div>
  );
}
