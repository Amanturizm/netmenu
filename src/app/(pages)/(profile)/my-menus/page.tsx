'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './my-menus.module.css';
import plusIcon from '@/assets/images/plus.png';
import axiosApi from '@/app/axiosApi';
import { useLayoutEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (!user) return router.push('/sign-in');
  }, [router]);

  const createMenu = async () => {
    try {
      const { data } = await axiosApi.post('menus');

      return router.push(`/menu/${data._id}`);
    } catch {
      // nothing
    }
  };

  return (
    <div className="wrapper">
      <div className={styles.title_block}>
        <h2>Ваши меню</h2>

        <button className={[styles.add_button, 'button-orange'].join(' ')} onClick={createMenu}>
          <span>Добавить</span>
          <Image src={plusIcon.src} width={20} height={20} alt="plus" />
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default Page;
