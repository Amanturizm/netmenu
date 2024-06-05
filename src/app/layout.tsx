import React from 'react';
import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'QR Netmenu',
  description: 'Application for watching menu',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
