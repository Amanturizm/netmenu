'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/app/(pages)/(authentication)/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import './authentication.css';
import { Tab } from '@/app/(pages)/(authentication)/types';
import Tabs from '@/app/(pages)/(authentication)/components/tabs/Tabs';
import { usePathname } from 'next/navigation';
import { TABS } from '@/app/(pages)/(authentication)/constants';

interface Props {
  children: React.ReactNode;
}

const AuthenticationLayout = ({ children }: Readonly<Props>) => {
  const pathname = usePathname();
  const [currentTab, setTab] = useState<Tab | null>(null);

  useEffect(() => {
    const foundTab = TABS.find((tab) => tab.href === pathname);
    if (foundTab) {
      setTab(foundTab);
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Tabs currentTab={currentTab} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AuthenticationLayout;
