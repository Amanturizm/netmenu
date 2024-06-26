import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import axiosApi from '@/app/axiosApi';
import Image from 'next/image';
import { ICategory, IDish } from '@/app/(pages)/(menu)/types';
import styles from './Dishes.module.css';
import dishesBgIcon from '@/assets/images/dishes-bg.png';
import backIcon from '@/assets/images/back.svg';
import { useRouter } from 'next/navigation';
import Dish from '@/app/(pages)/(menu)/components/Dish/Dish';
import CreateDishModal from '@/app/(pages)/(menu)/components/CreateDishModal/CreateDishModal';

interface Props {
  categoryId: string;
  menu_id: string;
  groupName: string;
}

const fetchData = async (categoryId: string) => {
  const { data: category } = await axiosApi.get('categories/' + categoryId);
  const { data: dishes } = await axiosApi.get('dishes/' + categoryId);

  return { category, dishes };
};

const Dishes: React.FC<Props> = ({ categoryId, menu_id, groupName }) => {
  const router = useRouter();

  const [category, setCategory] = useState<ICategory | null>(null);

  const [dishes, setDishes] = useState<IDish[]>([]);

  const [editableDish, setEditableDish] = useState<IDish | null>(null);

  const containerDishesRef = useRef<HTMLDivElement | null>(null);
  const [bgRepeats, setBgRepeats] = useState<number>(1);

  useEffect(() => {
    const container = containerDishesRef.current;

    if (container && dishes.length) {
      const containerHeight = container.offsetHeight;

      const img = new (window as any).Image();
      img.src = dishesBgIcon.src;
      img.onload = () => {
        const imgHeight = img.height;
        const repeatCount = Math.ceil(containerHeight / imgHeight);
        setBgRepeats(repeatCount);
      };
    }
  }, [dishes.length, containerDishesRef]);

  const fetchDishes = useCallback(async () => {
    const { category: categoryData, dishes: dishesData } = await fetchData(categoryId);

    setCategory(categoryData);
    setDishes(dishesData);
  }, [categoryId]);

  useLayoutEffect(() => {
    if (!category) {
      void fetchDishes();
    }
  }, [category, fetchDishes]);

  const editDish = async (dish: IDish) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(dish) as Array<keyof IDish>;
      keys.forEach((key) => {
        const value = dish[key];
        if (value) {
          formData.append(key, value);
        }
      });

      await axiosApi.patch<IDish>('dishes/' + dish._id, formData);
      await fetchDishes();
    } catch {
      // nothing
    }
  };

  return (
    <>
      <div className={styles.dishes_wrapper}>
        <button className={styles.back} onClick={() => router.push('/menu/' + menu_id + '?groupName=' + groupName)}>
          <Image src={backIcon.src} width={26} height={33} alt="back-icon" />
        </button>

        {category && <h2 className={styles.dishes_category_name}>{category.name}</h2>}

        <div
          ref={containerDishesRef}
          style={{ backgroundSize: bgRepeats > 1 ? 'cover' : 'contain' }}
          className={styles.dishes}
        >
          {dishes.map((dish) => (
            <Dish dish={dish} key={dish._id} setEditModal={setEditableDish} />
          ))}
        </div>
      </div>

      {editableDish && (
        <CreateDishModal
          hideModal={() => setEditableDish(null)}
          submitData={editDish}
          menu_id={menu_id}
          switchToCreateCategoryModal={() => null}
          editableDish={editableDish}
        />
      )}
    </>
  );
};

export default Dishes;
