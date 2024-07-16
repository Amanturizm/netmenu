import React, { useState } from 'react';
import axiosApi from '@/app/axiosApi';
import styles from './DeleteCategoryModal.module.css';
import Preloader from '@/app/components/UI/Preloader/Preloader';

interface Props {
  categoryId: string;
  hideModal: () => void;
  updateData: (categoryId: string) => void;
}

const DeleteCategoryModal: React.FC<Props> = ({ categoryId, hideModal, updateData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteCategory = async () => {
    try {
      setIsLoading(true);
      await axiosApi.delete('categories/' + categoryId);

      updateData(categoryId);
      hideModal();
    } catch {
      // nothing
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>

      <div className={styles.modal}>
        <p>Удалить категорию?</p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Отмена
          </button>
          <button
            className={[styles.remove_button, 'button-orange'].join(' ')}
            onClick={deleteCategory}
            disabled={isLoading}
          >
            {isLoading ? <Preloader color="#fff" scale={0.7} /> : 'Удалить'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryModal;
