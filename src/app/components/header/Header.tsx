'use client';
import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from '@/app/types';
import styles from './Header.module.css';
import logoIcon from '@/assets/images/logo.svg';
import profileIcon from '@/assets/images/profile.png';
import smartPhoneIcon from '@/assets/images/smart-phone.svg';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') as string);
    setUser(localUser ?? null);
  }, []);

  return (
    <header className={[styles.header, 'wrapper'].join(' ')}>
      <div className={styles.inner_wrapper}>
        <nav className={styles.navbar}>
          <Image src={logoIcon.src} width={150} height={40} alt="logo" />
          <div className={styles.navbar_buttons}>
            <button>Создать меню</button>
            <Link href={user ? '/profile' : '/sign-in'} className={styles.navbar_buttons_profile}>
              {user ? user.username ?? 'Профиль' : 'Войти'}
              <Image src={profileIcon.src} width={20} height={20} alt="profile" />
            </Link>
          </div>
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

            <button className="button-orange">Создать меню</button>
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
