'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import logoIcon from '@/assets/images/logo.svg';
import profileIcon from '@/assets/images/profile.png';
import smartPhoneIcon from '@/assets/images/smart-phone.svg';
import { User } from '@/app/types';
import React, { useLayoutEffect, useState } from 'react';

const Header = () => {
  // undefined = useLayoutEffect not worked
  // null = user is not registered
  // User = user is signed
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false);
  const [burgerMenuIsActive, setBurgerMenuIsActive] = useState<boolean>(false);

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string) || null);

    setIsBurgerMenu(window.innerWidth <= 578);

    const setBurgerMenu = (e: Event) => setIsBurgerMenu((e.target as { innerWidth: number } | null)!.innerWidth <= 578);

    window.addEventListener('resize', setBurgerMenu);

    return () => {
      window.removeEventListener('resize', setBurgerMenu);
    };
  }, []);

  return (
    <header className={[styles.header, 'wrapper'].join(' ')}>
      {burgerMenuIsActive && (
        <div className={styles.burger_content}>
          <nav className={styles.navbar}>
            <div className={styles.logo}>
              <Image src={logoIcon.src} fill alt="logo" />
            </div>

            <button
              className={[
                styles.hamburger,
                styles.hamburger__collapse,
                burgerMenuIsActive ? styles.is_active : '',
              ].join(' ')}
              type="button"
              onClick={() => setBurgerMenuIsActive(!burgerMenuIsActive)}
            >
              <span className={styles.hamburger_box}>
                <span className={styles.hamburger_inner}></span>
              </span>
            </button>

            <div className={styles.navbar_buttons}>
              <Link href={user ? '/my-menus' : '/sign-in'}>Создать меню</Link>
              <Link href={user ? '/my-menus' : '/sign-in'} className={styles.navbar_buttons_profile}>
                {user !== null ? 'Профиль' : 'Войти'}
                <Image src={profileIcon.src} width={20} height={20} alt="profile" />
              </Link>
            </div>
          </nav>
        </div>
      )}
      <div className={styles.inner_wrapper}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Image src={logoIcon.src} fill alt="logo" />
          </div>
          {user !== undefined && !isBurgerMenu && (
            <div className={styles.navbar_buttons}>
              <Link href={user ? '/my-menus' : '/sign-in'}>Создать меню</Link>
              <Link href={user ? '/my-menus' : '/sign-in'} className={styles.navbar_buttons_profile}>
                {user !== null ? 'Профиль' : 'Войти'}
                <Image src={profileIcon.src} width={20} height={20} alt="profile" />
              </Link>
            </div>
          )}
          {isBurgerMenu && (
            <button
              className={[
                styles.hamburger,
                styles.hamburger__collapse,
                burgerMenuIsActive ? styles.is_active : '',
              ].join(' ')}
              type="button"
              onClick={() => setBurgerMenuIsActive(!burgerMenuIsActive)}
            >
              <span className={styles.hamburger_box}>
                <span className={styles.hamburger_inner}></span>
              </span>
            </button>
          )}
        </nav>

        <div className={styles.content}>
          <div className={styles.content_block}>
            <h1 className={styles.content_title}>
              СОЗДАЙТЕ ЛИЧНОЕ
              <br />
              <strong>QR МЕНЮ</strong>
            </h1>

            <p className={styles.content_description}>
              С нами вы можете быстро создать интерактивное QR-меню для своего заведения, которое облегчит вашим гостям
              выбор блюд, а также поднимет продажи
            </p>

            <Link href={user ? '/my-menus' : '/sign-in'} className="button-orange">
              Создать меню
            </Link>
          </div>

          <div className={styles.content_smart_phone}>
            <Image src={smartPhoneIcon.src} fill quality={100} priority alt="smart-phone" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
