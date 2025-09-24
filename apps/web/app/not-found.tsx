import Link from 'next/link';
import { APP_TEXT } from '@aidonic/shared-utils';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-lg text-secondary mb-8">
          {APP_TEXT.errors.pageNotFound}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-inverse rounded-md hover:bg-primary-600"
        >
          {APP_TEXT.navigation.goBackHome}
        </Link>
      </div>
    </div>
  );
}
