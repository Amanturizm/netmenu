import React from 'react';
import Image from 'next/image';
import { s3Url } from '@/app/constants';
import timeIcon from '@/assets/images/time.svg';
import flashIcon from '@/assets/images/flash.svg';
import dishEditIcon from '@/assets/images/dish-edit.svg';
import { IDish } from '@/app/(pages)/(menu)/types';
import styles from './Dish.module.css';

interface Props {
  dish: IDish;
}

const Dish: React.FC<Props> = ({ dish }) => {
  return (
    <div className={styles.dish}>
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
          <span title={dish.oldPrice}>{dish.oldPrice ? dish.oldPrice + ' р.' : ''}</span>
          <span title={dish.price}>{dish.price}</span>р.
        </div>
      </div>
    </div>
  );
};

export default Dish;
