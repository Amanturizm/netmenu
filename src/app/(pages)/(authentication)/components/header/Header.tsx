import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import logoIcon from '@/assets/images/logo.svg';

const Header = () => {
  return (
    <header className={[styles.header, 'wrapper'].join(' ')}>
      <nav className={styles.navbar}>
        <Link href="/">
          <Image src={logoIcon.src} width={150} height={40} priority alt="logo" />
        </Link>

        <div className={styles.navbar_tools}>
          <Link href="/">Главная</Link>
          <div>Вход</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
