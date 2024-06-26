import React from 'react';
import axiosApi from '@/app/axiosApi';
import styles from './DeleteAdModal.module.css';

interface Props {
  hideModal: () => void;
  resetState: () => void;
}

const DeleteAdModal: React.FC<Props> = ({ hideModal, resetState }) => {
  const deleteAd = async () => {
    try {
      const { data } = await axiosApi.patch('users', { adImage: 'delete' });
      localStorage.setItem('user', JSON.stringify(data));
      resetState();
    } catch {
      // nothing
    } finally {
      hideModal();
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>

      <div className={styles.modal}>
        <p>Удалить рекламу?</p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Передумал
          </button>
          <button className={[styles.remove_button, 'button-orange'].join(' ')} onClick={deleteAd}>
            Удалить
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAdModal;
