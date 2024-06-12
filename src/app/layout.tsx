'use client';
import React from 'react';
import './fonts.css';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>QR Netmenu</title>
        <meta name="description" content="Application for watching menu" />
      </head>
      <body>{children}</body>
    </html>
  );
}
