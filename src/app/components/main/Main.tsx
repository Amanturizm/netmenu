import Image from 'next/image';
import styles from './Main.module.css';
import smartPhoneIcon from '@/assets/images/smart-phone-02.svg';
import smartPhoneMoneyIcon01 from '@/assets/images/smart-phone-icon-01.svg';
import smartPhoneMoneyIcon02 from '@/assets/images/smart-phone-icon-02.svg';
import smartPhoneMoneyIcon03 from '@/assets/images/smart-phone-icon-03.svg';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: ['400'], style: 'normal', subsets: ['latin'] });

const Main = () => {
  return (
    <main>
      <section className="wrapper">
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
        <div className={styles.section_one_bottom_item}></div>
      </section>

      <section className={['wrapper', styles.section_two].join(' ')}>
        <div className={styles.section_two_block}>
          <h1>Удобство</h1>
          <p>Работать с QR меню проще. Загружается меню быстрее. Полезной информации в меню больше.</p>
        </div>
        <div className={styles.section_two_block}>
          <h1>Безопасность</h1>
          <p>
            QR меню позволяет избежать физического контакта с бумажными меню и повышает уровень гигиены для посетителей
            заведения
          </p>
        </div>
        <div className={styles.section_two_block}>
          <h1>Экономичность</h1>
          <p>
            QR меню помогает сократить расходы на печать и обновление бумажных меню, что благоприятно сказывается на
            окружающей среде.
          </p>
        </div>
      </section>

      <section className={['wrapper', styles.section_three].join(' ')}>
        <h1>
          <strong>ЛУЧШИЕ</strong>
          <br />
          предложения
        </h1>

        <div className={styles.section_three_blocks}>
          <div className={styles.section_three_block}>
            <div>
              <h1>
                QR MENU
                <br />
                BASIC
              </h1>
              <h2>1 МЕСЯЦ</h2>
            </div>

            <div>
              <p className={montserrat.className}>9900 ₽</p>
              <button className="button-orange">Купить</button>
              <p>оплата производится за месяц, общая cтоимость равнается</p>
            </div>
          </div>

          <div className={styles.section_three_block}>
            <div>
              <h1>
                QR MENU
                <br />
                SUPER
              </h1>
              <h2>3 МЕСЯЦА</h2>
            </div>

            <div>
              <p className={montserrat.className}>9900 ₽</p>
              <button className="button-orange">Купить</button>
              <p>оплата производится за месяц, общая cтоимость равнается</p>
            </div>
          </div>

          <div className={styles.section_three_block}>
            <div>
              <h1>
                QR MENU
                <br />
                ULTRA
              </h1>
              <h2>6 МЕСЯЦЕВ</h2>
            </div>

            <div>
              <p className={montserrat.className}>9900 ₽</p>
              <button className="button-orange">Купить</button>
              <p>оплата производится за месяц, общая cтоимость равнается</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
