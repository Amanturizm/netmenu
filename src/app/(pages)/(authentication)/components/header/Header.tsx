import styles from './Header.module.css';
import Image from 'next/image';
import logoIcon from '@/assets/images/logo.svg';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={[styles.header, 'wrapper'].join(' ')}>
      <nav className={styles.navbar}>
        <Image src={logoIcon.src} width={150} height={40} priority alt="logo" />

        <div className={styles.navbar_tools}>
          <Link href="/">Главная</Link>
          <div>Вход</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
