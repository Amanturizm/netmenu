'use client';
import { useEffect } from 'react';
import Header from '@/app/components/header/Header';
import Main from '@/app/components/main/Main';
import Footer from '@/app/components/footer/Footer';

const Page = () => {
  useEffect(() => void (document.body.style.backgroundColor = '#eaeaea'), []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Page;
