import React from 'react';
import axiosApi from '@/app/axiosApi';
import styles from './DeleteDishModal.module.css';

interface Props {
  dishId: string;
  hideModal: () => void;
  updateData: (dishId: string) => void;
}

const DeleteDishModal: React.FC<Props> = ({ dishId, hideModal, updateData }) => {
  const deleteDish = async () => {
    try {
      await axiosApi.delete('dishes/' + dishId);

      updateData(dishId);
      hideModal();
    } catch {
      // nothing
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
          <button className={[styles.remove_button, 'button-orange'].join(' ')} onClick={deleteDish}>
            Удалить
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteDishModal;
