'use client';
import React from 'react';
import Header from '@/app/(pages)/(profile)/components/header/Header';
import './profile.css';

interface Props {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: Readonly<Props>) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default ProfileLayout;
