'use client';
import React, { useEffect, useLayoutEffect } from 'react';
import Header from '@/app/(pages)/(profile)/components/header/Header';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: Readonly<Props>) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (!user) return router.push('/sign-in');
  }, [router]);

  useEffect(() => void (document.body.style.backgroundColor = '#ffffff'), []);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default ProfileLayout;
