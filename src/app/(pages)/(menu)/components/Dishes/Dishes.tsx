import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axiosApi from '@/app/axiosApi';
import { ICategory, IDish } from '@/app/(pages)/(menu)/types';
import styles from './Dishes.module.css';
import Image from 'next/image';
import timeIcon from '@/assets/images/time.svg';
import flashIcon from '@/assets/images/flash.svg';
import dishEditIcon from '@/assets/images/dish-edit.svg';
import dishesBgIcon from '@/assets/images/dishes-bg.png';
import { s3Url } from '@/app/constants';

interface Props {
  categoryId: string;
}

const fetchData = async (categoryId: string) => {
  const { data: category } = await axiosApi.get('categories/' + categoryId);
  const { data: dishes } = await axiosApi.get('dishes/' + categoryId);

  return { category, dishes };
};

const Dishes: React.FC<Props> = ({ categoryId }) => {
  const [category, setCategory] = useState<ICategory | null>(null);

  const [dishes, setDishes] = useState<IDish[]>([]);

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
  }, [dishes.length, containerDishesRef.current]);

  useLayoutEffect(() => {
    if (!category) {
      (async () => {
        const { category: categoryData, dishes: dishesData } = await fetchData(categoryId);

        setCategory(categoryData);
        setDishes(dishesData);
      })();
    }
  }, [category, categoryId]);

  return (
    category && (
      <div className={styles.dishes_wrapper}>
        <h2 className={styles.dishes_category_name}>{category.name}</h2>

        <div
          ref={containerDishesRef}
          style={{ backgroundSize: bgRepeats > 1 ? 'cover' : 'contain' }}
          className={styles.dishes}
        >
          {dishes.map((dish) => (
            <div className={styles.dish} key={dish._id}>
              <Image className={styles.dish_image} src={s3Url! + dish.image} width={512} height={228} alt="dish-img" />

              <div className={styles.dish_first_section}>
                <h2 title={dish.name}>{dish.name}</h2>
                <p title={dish.weight}>{dish.weight} г.</p>
              </div>

              <p className={styles.dish_description} title={dish.description}>
                {dish.description}
              </p>

              <div className={styles.second_section}>
                <h2>
                  <Image src={timeIcon.src} width={48} height={48} alt="time-icon" />
                  <span title={dish.preparationTime}>{dish.preparationTime}</span>мин
                </h2>

                <p>
                  <Image src={flashIcon.src} width={48} height={48} alt="flash-icon" />
                  {dish.calories} кКл/{' '}
                  {(() => {
                    const parts = dish.proteinAndFatAndCarbohydrates.split('/');
                    return `${parts[0]}б/${parts[1] ?? '?'}ж/${parts[2] ?? '?'}уг`;
                  })()}
                </p>
              </div>

              <div className={styles.dish_buttons}>
                <button className={styles.dish_edit_button}>
                  Редактировать
                  <Image src={dishEditIcon.src} width={30} height={30} alt="edit-icon" />
                </button>
                <div className={styles.dish_price}>
                  {dish.oldPrice && (
                    <>
                      <span title={dish.oldPrice}>{dish.oldPrice + ' р.'}</span>
                    </>
                  )}
                  <span title={dish.price}>{dish.price}</span>р.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Dishes;
