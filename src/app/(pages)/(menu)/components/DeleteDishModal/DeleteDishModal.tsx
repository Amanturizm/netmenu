import React, { useState } from 'react';
import axiosApi from '@/app/axiosApi';
import styles from './DeleteDishModal.module.css';
import Preloader from '@/app/components/UI/Preloader/Preloader';

interface Props {
  dishId: string;
  hideModal: () => void;
  updateData: (dishId: string) => void;
}

const DeleteDishModal: React.FC<Props> = ({ dishId, hideModal, updateData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteDish = async () => {
    try {
      setIsLoading(true);
      await axiosApi.delete('dishes/' + dishId);

      updateData(dishId);
    } catch {
      // nothing
    } finally {
      hideModal();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>

      <div className={styles.modal}>
        <p>Удалить позицию?</p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Отмена
          </button>
          <button
            className={[styles.remove_button, 'button-orange'].join(' ')}
            onClick={deleteDish}
            disabled={isLoading}
          >
            {isLoading ? <Preloader color="#fff" scale={0.7} margin="0" /> : 'Удалить'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteDishModal;
