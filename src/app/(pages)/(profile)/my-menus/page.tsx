'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './my-menus.module.css';
import axiosApi from '@/app/axiosApi';
import { useLayoutEffect, useState } from 'react';
import { IMenu } from '@/app/(pages)/(menu)/types';
import { s3Url } from '@/app/constants';
import plusIcon from '@/assets/images/plus.png';
import trashIcon from '@/assets/images/trash.svg';

import Link from 'next/link';
import DeleteMenuModal from '@/app/(pages)/(profile)/components/delete-menu-modal/DeleteMenuModal';
import Preloader from '@/app/components/UI/Preloader/Preloader';

export interface MyMenusMenuState extends Omit<IMenu, 'address' | 'user' | 'wifiName' | 'wifiPassword'> {
  categoriesCount: number;
}

const fetchData = async (): Promise<MyMenusMenuState[]> => {
  const { data } = await axiosApi.get<MyMenusMenuState[]>('/menus');

  return await Promise.all(
    data.map(async (menu) => {
      const { data: categoriesCount } = await axiosApi.get<string>(`/categories/menu/${menu._id}?onlyLength=true`);

      return {
        ...menu,
        categoriesCount: parseInt(categoriesCount),
      };
    }),
  );
};

const Page = () => {
  const router = useRouter();

  const [menus, setMenus] = useState<MyMenusMenuState[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [deletedMenu, setDeletedMenu] = useState<MyMenusMenuState | null>();

  useLayoutEffect(() => {
    if (!menus.length) {
      (async () => {
        setIsLoading(true);

        const data = await fetchData();
        setMenus(data);

        setIsLoading(false);
      })();
    }
  }, [menus.length]);

  const createMenu = async () => {
    try {
      const { data } = await axiosApi.post('menus');

      return router.push(`/menu/${data._id}?groupName=Еда`);
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

      <div className={styles.menus}>
        {menus.map((menu) => (
          <div className={styles.menu} key={menu._id}>
            <div>
              {menu.image ? (
                <Image src={s3Url + menu.image} width={42} height={42} unoptimized alt="menu-photo" />
              ) : (
                <div className={styles.not_image}></div>
              )}
              <p title={menu.name || undefined}>{menu.name || 'Без названия'}</p>
            </div>

            <div>
              <h2>{menu.categoriesCount}</h2>
              <p>категорий блюд</p>
            </div>

            <div>
              <Link href={`/menu/${menu._id}?groupName=Еда`} className={[styles.go_to_menu, 'button-orange'].join(' ')}>
                Перейти
              </Link>
              <button onClick={() => setDeletedMenu(menu)}>
                <Image src={trashIcon.src} width={26} height={26} alt="trash-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isLoading && <Preloader scale={1.3} margin="10%" align="center" />}

      {deletedMenu && (
        <DeleteMenuModal
          menu_id={deletedMenu._id ?? ''}
          menu_name={deletedMenu.name}
          hideModal={() => setDeletedMenu(null)}
          setNewData={() =>
            (async () => {
              const data = await fetchData();
              setMenus(data);
            })()
          }
        />
      )}
    </div>
  );
};

export default Page;
