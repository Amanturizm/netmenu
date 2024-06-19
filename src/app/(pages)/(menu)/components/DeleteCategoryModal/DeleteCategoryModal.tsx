import React from 'react';
import axiosApi from '@/app/axiosApi';
import styles from './DeleteCategoryModal.module.css';

interface Props {
  categoryId: string;
  hideModal: () => void;
  updateData: (categoryId: string) => void;
}

const DeleteCategoryModal: React.FC<Props> = ({ categoryId, hideModal, updateData }) => {
  const deleteCategory = async () => {
    try {
      await axiosApi.delete('categories/' + categoryId);

      updateData(categoryId);
      hideModal();
    } catch {
      // nothing
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
          <button className={[styles.remove_button, 'button-orange'].join(' ')} onClick={deleteCategory}>
            Удалить
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryModal;
