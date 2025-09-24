'use client';

import { useEffect } from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">500</h1>
        <p className="text-lg text-gray-600 mb-8">
          {APP_TEXT.errors.somethingWentWrong}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {APP_TEXT.navigation.tryAgain}
        </button>
      </div>
    </div>
  );
}
