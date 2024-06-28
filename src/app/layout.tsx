'use client';
import React from 'react';
import './fonts.css';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';

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
      <body>
        <NextTopLoader
          color="#ffad78"
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        {children}
      </body>
    </html>
  );
}
