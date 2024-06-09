'use client';
import React from 'react';
import Header from '@/app/(pages)/(authentication)/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import styles from './authentication.module.css';

interface Props {
  children: React.ReactNode;
}

const AuthenticationLayout = ({ children }: Readonly<Props>) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default AuthenticationLayout;
