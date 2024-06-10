import styles from './tariffs.module.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: ['400'], style: 'normal', subsets: ['latin'] });

const Page = () => {
  return (
    <div className="wrapper">
      <h2 className={styles.title}>Приобрести QR меню</h2>
      <span className={[styles.tariff_status, 'button-orange'].join(' ')}>Активен тариф: до окончания 92 дня</span>

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
    </div>
  );
};

export default Page;
