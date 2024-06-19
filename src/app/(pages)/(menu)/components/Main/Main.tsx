import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import addDishIcon from '@/assets/images/add-dish.svg';
import addCategoryIcon from '@/assets/images/add-category.svg';
import { s3Url } from '@/app/constants';
import editCategoryIcon from '@/assets/images/edit.png';
import deleteCategoryIcon from '@/assets/images/delete.png';
import CreateCategoryModal from '@/app/(pages)/(menu)/components/CreateCategoryModal/CreateCategoryModal';
import DeleteCategoryModal from '@/app/(pages)/(menu)/components/DeleteCategoryModal/DeleteCategoryModal';
import { ICategory, IDish } from '@/app/(pages)/(menu)/types';
import axiosApi from '@/app/axiosApi';
import styles from './Main.module.css';
import CreateDishModal from '@/app/(pages)/(menu)/components/CreateDishModal/CreateDishModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  menu_id: string;
}

const fetchData = async (menu_id: string) => {
  const { data: categories } = await axiosApi.get<ICategory[]>('/categories/menu/' + menu_id);

  return { categories };
};

const Main: React.FC<Props> = ({ menu_id }) => {
  const router = useRouter();
  const params = useSearchParams();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isCreateCategoryModal, setIsCreateCategoryModal] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<string>('');
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');

  const [isCreateDishModal, setIsCreateDishModal] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!categories.length) {
      (async () => {
        const { categories: data } = await fetchData(menu_id);
        setCategories(data);
      })();
    }
  }, [categories.length, menu_id]);

  const createCategory = async (category: ICategory) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(category) as Array<keyof ICategory>;
      keys.forEach((key) => {
        const value = category[key];
        if (value) {
          formData.append(key, value);
        }
      });

      const { data } = await axiosApi.post<ICategory>('categories/' + menu_id, formData);

      setCategories((prevState) => [...prevState, data]);
    } catch {
      // nothing
    }
  };

  const createDish = async (dish: IDish) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(dish) as Array<keyof IDish>;
      keys.forEach((key) => {
        let value = dish[key];
        if (typeof value === 'string') value = value.trim();
        if (value) {
          formData.append(key, value);
        }
      });

      await axiosApi.post<IDish>('dishes/', formData);
    } catch {
      // nothing
    }
  };

  return (
    <>
      <div className={styles.menu_add_buttons}>
        <button
          className={[styles.menu_add_dish_button, 'button-orange'].join(' ')}
          onClick={() => setIsCreateDishModal(true)}
        >
          <span>Добавить блюдо</span>
          <Image src={addDishIcon.src} width={28} height={28} alt="add-dish-icon" />
        </button>
        <button
          className={[styles.menu_add_category_button, 'button-orange'].join(' ')}
          onClick={() => setIsCreateCategoryModal(true)}
        >
          <span>Добавить категорию</span>
          <Image src={addCategoryIcon.src} width={28} height={28} alt="add-category-icon" />
        </button>
      </div>

      <div className={[styles.menu_categories, styles.section_wrapper].join(' ')}>
        {categories.map((category) => (
          <div
            onClick={() => router.push('?category=' + category._id)}
            className={styles.menu_category}
            style={{ backgroundImage: `url(${s3Url! + category.image})` }}
            key={category._id}
          >
            <p>{category.name}</p>

            <div className={styles.category_buttons}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditCategoryId(category._id || '');
                }}
              >
                <Image src={editCategoryIcon.src} width={18} height={18} alt="edit-icon" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteCategoryId(category._id || '');
                }}
              >
                <Image src={deleteCategoryIcon.src} width={18} height={18} alt="delete-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCreateCategoryModal && (
        <CreateCategoryModal hideModal={() => setIsCreateCategoryModal(false)} submitData={createCategory} />
      )}
      {deleteCategoryId && (
        <DeleteCategoryModal
          categoryId={deleteCategoryId}
          hideModal={() => setDeleteCategoryId('')}
          updateData={(categoryId) => {
            setCategories((prevState) => prevState.filter((category) => category._id !== categoryId));
          }}
        />
      )}
      {isCreateDishModal && (
        <CreateDishModal
          hideModal={() => setIsCreateDishModal(false)}
          submitData={createDish}
          categories={categories}
        />
      )}
    </>
  );
};

export default Main;
