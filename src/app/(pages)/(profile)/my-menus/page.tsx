import Image from 'next/image';
import styles from './my-menus.module.css';
import plusIcon from '@/assets/images/plus.png';

const Page = () => {
  return (
    <div className="wrapper">
      <div className={styles.title_block}>
        <h2>Ваши меню</h2>

        <button className={[styles.add_button, 'button-orange'].join(' ')}>
          <span>Добавить</span>
          <Image src={plusIcon.src} width={20} height={20} alt="plus" />
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default Page;
