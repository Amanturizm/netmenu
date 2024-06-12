'use client';
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const MenuLayout = ({ children }: Readonly<Props>) => {
  useEffect(() => void (document.body.style.backgroundColor = '#373737'), []);

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MenuLayout;
