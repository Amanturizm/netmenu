import Image from 'next/image';
import styles from './Footer.module.css';
import logoIcon from '@/assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <Image src={logoIcon.src} width={150} height={40} alt="logo" />

        <div className={styles.footer_contacts}>
          <span>Контакты</span>
          <p>qrmenu@yandex.com</p>
          <p>7 983 121 34 12</p>
        </div>
      </div>

      <div className={styles.footer_info}>
        <p>Сайт разработало агентсво ASMAS</p>
        <p>2024, все права защищены</p>
      </div>
    </footer>
  );
};

export default Footer;
