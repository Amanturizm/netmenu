'use client';
import Link from 'next/link';
import Tabs from '@/app/(pages)/(authentication)/components/tabs/Tabs';
import auth_styles from '../authentication.module.css';
import styles from './password-recovery-confirmation.module.css';

const Page = () => {
  return (
    <>
      <Tabs />

      <div className={auth_styles.auth_block}>
        <h2>Проверьте почту</h2>

        <p className={styles.description_one}>
          На E-mail, указанный при регистрации, вам отправлен новый временный пароль
        </p>

        <p className={styles.description_two}>Позже вы можете сменить его в личном кабинете</p>

        <Link
          href="/sign-in"
          className={[auth_styles.submit_button, 'button-orange'].join(' ')}
          style={{ padding: '12px 52px', marginTop: 29 }}
        >
          Продолжить
        </Link>
      </div>
    </>
  );
};

export default Page;
