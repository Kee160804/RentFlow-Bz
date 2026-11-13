import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RentFlow BZ | Property management made simple',
  description: 'A Belize-focused rental management workspace for landlords and tenants.',
  applicationName: 'RentFlow BZ',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'RentFlow BZ' }
};

export const viewport: Viewport = {
  themeColor: '#0e7490',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
