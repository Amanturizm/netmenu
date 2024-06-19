'use client';
import Image from 'next/image';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { IMenu } from '@/app/(pages)/(menu)/types';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axiosApi from '@/app/axiosApi';
import { s3Url } from '@/app/constants';
import Main from '@/app/(pages)/(menu)/components/Main/Main';
import styles from './menu.module.css';
import menuCloseIcon from '@/assets/images/menu-close.png';
import menuIcon from '@/assets/images/menu-bg.png';
import editIcon from '@/assets/images/edit.svg';
import uploadImageIcon from '@/assets/images/upload-image.svg';
import locationIcon from '@/assets/images/location.png';
import wifiIcon from '@/assets/images/wi-fi.png';
import searchIcon from '@/assets/images/search.svg';
import qrCodeIcon from '@/assets/images/qr-code.svg';
import Dishes from '@/app/(pages)/(menu)/components/Dishes/Dishes';

type State = Omit<IMenu, 'user' | '_id'>;

const initialState: State = {
  name: '',
  image: null,
  address: '',
  wifiName: '',
  wifiPassword: '',
};

const fetchData = async (menu_id: string) => {
  const { data: menu } = await axiosApi.get<State>('/menus/' + menu_id);

  return { menu };
};

const Page = () => {
  const router = useRouter();
  const { menu_id } = useParams<{ menu_id: string }>();
  const categoryId = useSearchParams().get('category');

  const [fetchedData, setFetchedData] = useState<State | null>(null);
  const [menu, setMenu] = useState<State | null>(null);
  const [isNameField, setIsNameField] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fieldsLoading, setFieldsLoading] = useState<Array<keyof State>>([]);

  const [groupName, setGroupName] = useState<string>('Еда');

  const getFilteredMenu = (data: State) => {
    const stateKeys = Object.keys(initialState) as Array<keyof State>;

    const filteredMenu: State = initialState;

    stateKeys.forEach((key: keyof State) => {
      filteredMenu[key] = data[key];
    });

    return filteredMenu;
  };

  useLayoutEffect(() => {
    (async () => {
      try {
        const { menu: menuData } = await fetchData(menu_id);

        const filteredMenu = getFilteredMenu(menuData);

        setFetchedData(filteredMenu);

        setMenu(filteredMenu);
      } catch (e) {
        console.error(e);
        router.push('/my-menus');
      }
    })();
  }, [menu_id, router]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMenu((prevState) => prevState && { ...prevState, [name]: value.trimStart() });
  };

  const saveValue = async (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof State; value: string };

    if (fetchedData && fetchedData[name] === value) return;

    try {
      setFieldsLoading((prevState) => prevState && [...prevState, name]);

      await axiosApi.patch('/menus/' + menu_id, { [name]: value });

      setFetchedData((prevState) => prevState && { ...prevState, [name]: value });
    } catch (e) {
      console.error(e);
    } finally {
      setFieldsLoading((prevState) => prevState && prevState.filter((field) => field !== name));
    }
  };

  const saveImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target as { name: keyof State; files: File[] | null };
    if (!files || !files.length || fieldsLoading.includes(name)) return;

    try {
      setFieldsLoading((prevState) => prevState && [...prevState, name]);

      const formData = new FormData();
      formData.append(e.target.name, files[0]);

      const { data } = await axiosApi.patch('/menus/' + menu_id, formData);

      setMenu((prevState) => prevState && { ...prevState, [name]: data[name] });
    } catch (e) {
      console.error(e);
    }
  };

  if (!menu) return null;

  return (
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
            {isNameField ? (
              <div className={styles.name_field}>
                <input
                  type="text"
                  name="name"
                  value={menu.name || ''}
                  autoFocus
                  onChange={changeValue}
                  onBlur={async (e) => {
                    await saveValue(e);
                    setIsNameField(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      await saveValue(e);
                      setIsNameField(false);
                    }
                  }}
                  disabled={fieldsLoading.includes('name')}
                  placeholder="Введите название"
                />

                {fieldsLoading.includes('name') && <span className={styles.loader}></span>}
              </div>
            ) : (
              <div onClick={() => setIsNameField(true)}>
                <h2 title={menu.name || undefined}>{menu.name && menu.name.trim() ? menu.name : 'Название'}</h2>
                <Image src={editIcon.src} width={24} height={24} alt="edit-icon" />
              </div>
            )}

            <div>
              <div
                className={[styles.upload_image, fieldsLoading.includes('image') && styles.upload_image_loading].join(
                  ' ',
                )}
                style={{
                  border: menu.image && !fieldsLoading.includes('image') ? '2px solid #999999' : 'none',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={menu.image ? s3Url + menu.image : uploadImageIcon.src}
                  width={
                    (fetchedData?.image && fieldsLoading.includes('image')) ||
                    (menu.image && !fieldsLoading.includes('image'))
                      ? 50
                      : 30
                  }
                  height={
                    (fetchedData?.image && fieldsLoading.includes('image')) ||
                    (menu.image && !fieldsLoading.includes('image'))
                      ? 50
                      : 30
                  }
                  unoptimized
                  priority
                  onLoad={() => {
                    if (fieldsLoading.includes('image')) {
                      setFieldsLoading((prevState) => prevState && prevState.filter((field) => field !== 'image'));
                      setFetchedData({ ...menu });
                    }
                  }}
                  onError={() => {
                    if (fieldsLoading.includes('image')) {
                      setFieldsLoading((prevState) => prevState && prevState.filter((field) => field !== 'image'));
                      setFetchedData({ ...menu });
                    }
                  }}
                  alt="upload-icon"
                />

                {fieldsLoading.includes('image') && <span className={styles.image_loader}></span>}
              </div>
              <p
                style={{ cursor: fieldsLoading.includes('image') ? 'not-allowed' : 'pointer' }}
                onClick={() => !fieldsLoading.includes('image') && fileInputRef.current?.click()}
              >
                {(fetchedData?.image && fieldsLoading.includes('image')) ||
                (menu.image && !fieldsLoading.includes('image'))
                  ? 'Изменить '
                  : 'Добавьте '}
                фото
              </p>
              <input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png, .svg, .webp"
                ref={fileInputRef}
                onChange={saveImage}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <form autoComplete="off" className={styles.second_section}>
            <div className={styles.second_section_first_line}>
              <Image src={locationIcon.src} width={18} height={18} alt="location-icon" />

              <div className={styles.address}>
                <input
                  type="text"
                  placeholder="Введите адрес заведения"
                  name="address"
                  title={menu.address ?? ''}
                  value={menu.address ?? ''}
                  onChange={(e) => e.target.value.length <= 30 && changeValue(e)}
                  onBlur={saveValue}
                  onKeyDown={(e) => e.key === 'Enter' && saveValue(e)}
                  disabled={fieldsLoading.includes('address')}
                />

                {fieldsLoading.includes('address') && <span className={styles.loader}></span>}
              </div>
            </div>

            <div className={styles.second_section_second_line}>
              <Image src={wifiIcon.src} width={18} height={18} alt="location-icon" />

              <div className={styles.wifi_name}>
                <input
                  type="text"
                  placeholder="Название WI-FI"
                  name="wifiName"
                  title={menu.wifiName ?? ''}
                  value={menu.wifiName ?? ''}
                  onChange={(e) => e.target.value.length <= 16 && changeValue(e)}
                  onBlur={saveValue}
                  onKeyDown={(e) => e.key === 'Enter' && saveValue(e)}
                  disabled={fieldsLoading.includes('wifiName')}
                />

                {fieldsLoading.includes('wifiName') && <span className={styles.loader}></span>}
              </div>

              <div className={styles.wifi_password}>
                <input
                  type="text"
                  placeholder="Введите пароль от WI-FI"
                  name="wifiPassword"
                  title={menu.wifiPassword ?? ''}
                  value={menu.wifiPassword ?? ''}
                  onChange={(e) => e.target.value.length <= 15 && changeValue(e)}
                  onBlur={saveValue}
                  onKeyDown={(e) => e.key === 'Enter' && saveValue(e)}
                  disabled={fieldsLoading.includes('wifiPassword')}
                  style={{ marginLeft: 5 }}
                />

                {fieldsLoading.includes('wifiPassword') && <span className={styles.loader}></span>}
              </div>
            </div>
          </form>
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

        {!categoryId && <Main menu_id={menu_id} />}
        {categoryId && <Dishes categoryId={categoryId} />}
      </div>

      <button className={[styles.button_qr, 'button-orange'].join(' ')}>
        <span>Открыть QR</span>
        <Image src={qrCodeIcon.src} width={38} height={38} alt="qr-code-icon" />
      </button>
    </div>
  );
};

export default Page;
