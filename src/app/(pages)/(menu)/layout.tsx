import React from 'react';
import './menu.css';

interface Props {
  children: React.ReactNode;
}

const MenuLayout = ({ children }: Readonly<Props>) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MenuLayout;
