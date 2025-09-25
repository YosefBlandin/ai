/**
 * @fileoverview Root layout
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { APP_TEXT } from '@aidonic/shared-utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aidonic - Aid Distribution Dashboard',
  description:
    'A comprehensive dashboard for managing aid distribution operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background-secondary">
          <header className="bg-background-primary border-b border-border-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary">
                      {APP_TEXT.branding.appName}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
