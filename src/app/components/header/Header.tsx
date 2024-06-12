'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import logoIcon from '@/assets/images/logo.svg';
import profileIcon from '@/assets/images/profile.png';
import smartPhoneIcon from '@/assets/images/smart-phone.svg';
import { User } from '@/app/types';
import { useLayoutEffect, useState } from 'react';

const Header = () => {
  // undefined = useLayoutEffect not worked
  // null = user is not registered
  // User = user is signed
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string) || null);
  }, []);

  return (
    <header className={[styles.header, 'wrapper'].join(' ')}>
      <div className={styles.inner_wrapper}>
        <nav className={styles.navbar}>
          <Image src={logoIcon.src} width={150} height={40} alt="logo" />
          {user !== undefined && (
            <div className={styles.navbar_buttons}>
              <Link href={user ? '/my-menus' : '/sign-in'}>Создать меню</Link>
              <Link href={user ? '/my-menus' : '/sign-in'} className={styles.navbar_buttons_profile}>
                {user !== null ? 'Профиль' : 'Войти'}
                <Image src={profileIcon.src} width={20} height={20} alt="profile" />
              </Link>
            </div>
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
              С нами вы можете быстро создать интерактивное QR-меню для своего заведения С нами вы можете быстро создать
              интерактивное QR-меню для своего заведения
            </p>

            <Link href={user ? '/my-menus' : '/sign-in'} className="button-orange">
              Создать меню
            </Link>
          </div>

          <Image
            className={styles.content_smart_phone}
            src={smartPhoneIcon.src}
            width={468}
            height={550}
            quality={100}
            priority
            alt="smart-phone"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
