import Image from 'next/image';
import styles from './Main.module.css';
import smartPhoneIcon from '@/assets/images/smart-phone-02.svg';
import smartPhoneMoneyIcon01 from '@/assets/images/smart-phone-icon-01.svg';
import smartPhoneMoneyIcon02 from '@/assets/images/smart-phone-icon-02.svg';
import smartPhoneMoneyIcon03 from '@/assets/images/smart-phone-icon-03.svg';

const Main = () => {
  return (
    <main>
      <section className={'wrapper'}>
        <div className={styles.section_one}>
          <div className={styles.section_one_info}>
            <h1 className={styles.section_one_title}>
              QR МЕНЮ
              <br />
              повышает продажи
            </h1>
            <p className={styles.section_one_description}>
              Электронное QR меню продает больше. Фотографии повышают аппетит - аппетит повышает средний чек. Сделать
              заказ становится проще. Меньше времени на раздумья, больше спонтанных покупок - выше средний чек.
            </p>
          </div>

          <div className={styles.section_one_smart_phone}>
            <Image src={smartPhoneIcon.src} fill alt="smart-phone" />

            <Image
              className={styles.section_one_smart_phone_money_01}
              src={smartPhoneMoneyIcon01.src}
              width={113}
              height={113}
              alt="smart-phone-icon"
            />
            <Image
              className={styles.section_one_smart_phone_money_02}
              src={smartPhoneMoneyIcon02.src}
              width={113}
              height={113}
              alt="smart-phone-icon"
            />
            <Image
              className={styles.section_one_smart_phone_money_03}
              src={smartPhoneMoneyIcon03.src}
              width={113}
              height={113}
              alt="smart-phone-icon"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
