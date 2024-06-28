'use client';
import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/(pages)/(authentication)/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import styles from './authentication.module.css';

interface Props {
  children: React.ReactNode;
}

const AuthenticationLayout = ({ children }: Readonly<Props>) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) return router.back();
  }, [router]);

  return (
    <>
      <div className={styles.bg_wrapper}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AuthenticationLayout;
