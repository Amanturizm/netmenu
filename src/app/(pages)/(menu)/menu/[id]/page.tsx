'use client';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';
import { IMenu } from '@/app/(pages)/(menu)/types';
import { useRouter } from 'next/navigation';
import styles from './menu.module.css';
import menuCloseIcon from '@/assets/images/menu-close.png';
import menuIcon from '@/assets/images/menu-bg.png';
import editIcon from '@/assets/images/edit.svg';
import uploadImageIcon from '@/assets/images/upload-image.svg';
import locationIcon from '@/assets/images/location.png';
import wifiIcon from '@/assets/images/wi-fi.png';
import searchIcon from '@/assets/images/search.svg';
import addDishIcon from '@/assets/images/add-dish.svg';
import addCategoryIcon from '@/assets/images/add-category.svg';
import qrCodeIcon from '@/assets/images/qr-code.svg';

import category01Icon from '@/assets/images/category_01.png';
import category02Icon from '@/assets/images/category_02.png';
import category03Icon from '@/assets/images/category_03.png';

type State = Omit<IMenu, 'user' | '_id'>;

const initialState: State = {
  name: '',
  image: null,
  address: '',
  wifiName: '',
  wifiPassword: '',
};

const Page = () => {
  const router = useRouter();

  const [menu, setMenu] = useState<State | null>(null);

  const [groupName, setGroupName] = useState<string>('Еда');

  useLayoutEffect(() => {
    setMenu(initialState);
  }, []);

  return (
    menu && (
      <div className={styles.menu_wrapper}>
        <Image
          className={styles.menu_close}
          onClick={() => router.push('/my-menus')}
          src={menuCloseIcon.src}
          width={40}
          height={40}
          alt="close-icon"
        />
        <Image className={styles.menu_bg} src={menuIcon.src} width={582} height={253} priority alt="menu-bg" />

        <div className={styles.menu}>
          <div className={[styles.menu_info, styles.section_wrapper].join(' ')}>
            <div className={styles.first_section}>
              <div>
                <h2>{menu.name || 'Название'}</h2>
                <Image src={editIcon.src} width={24} height={24} alt="edit-icon" />
              </div>

              <div>
                <div className={styles.upload_image}>
                  <Image src={uploadImageIcon.src} width={30} height={30} alt="upload-icon" />
                </div>
                <p>Добавьте фото</p>
              </div>
            </div>

            <div className={styles.second_section}>
              <div>
                <Image src={locationIcon.src} width={18} height={18} alt="location-icon" />
                {menu.address ? <p>{menu.address}</p> : <input type="text" placeholder="Введите адрес заведения" />}
              </div>

              <div>
                <Image src={wifiIcon.src} width={18} height={18} alt="location-icon" />

                {menu.wifiName ? <p>{menu.wifiName}</p> : <input type="text" placeholder="Название WI-FI" />}
                {menu.wifiPassword ? (
                  <p>{menu.wifiPassword}</p>
                ) : (
                  <input type="text" placeholder="Введите пароль от WI-FI" />
                )}
              </div>
            </div>
          </div>

          <div className={styles.menu_navigation}>
            <div className={styles.menu_navigation_search}>
              <Image src={searchIcon.src} width={30} height={30} alt="search-icon" />
              <input type="text" placeholder="Поиск добавленного блюда" />
            </div>

            <div className={styles.menu_navigation_tabs}>
              <div
                className={groupName === 'Еда' ? styles.in_active : undefined}
                style={{ padding: '11px 45px' }}
                onClick={() => setGroupName('Еда')}
              >
                Еда
              </div>
              <div
                className={groupName === 'Напитки' ? styles.in_active : undefined}
                style={{ padding: '11px 32px' }}
                onClick={() => setGroupName('Напитки')}
              >
                Напитки
              </div>
            </div>
          </div>

          <div className={styles.menu_add_buttons}>
            <button className={[styles.menu_add_dish_button, 'button-orange'].join(' ')}>
              <span>Добавить блюдо</span>
              <Image src={addDishIcon.src} width={28} height={28} alt="add-dish-icon" />
            </button>
            <button className={[styles.menu_add_category_button, 'button-orange'].join(' ')}>
              <span>Добавить категорию</span>
              <Image src={addCategoryIcon.src} width={28} height={28} alt="add-category-icon" />
            </button>
          </div>

          <div className={[styles.menu_categories, styles.section_wrapper].join(' ')}>
            <div style={{ backgroundImage: `url(${category01Icon.src})` }}>Горячие блюда</div>
            <div style={{ backgroundImage: `url(${category02Icon.src})` }}>Салаты</div>
            <div style={{ backgroundImage: `url(${category03Icon.src})` }}>Десерты</div>
          </div>
        </div>

        <button className={[styles.button_qr, 'button-orange'].join(' ')}>
          <span>Открыть QR</span>
          <Image src={qrCodeIcon.src} width={38} height={38} alt="qr-code-icon" />
        </button>
      </div>
    )
  );
};

export default Page;
