import React, { useState } from 'react';
import styles from './DeleteMenuModal.module.css';
import axiosApi from '@/app/axiosApi';
import Preloader from '@/app/components/UI/Preloader/Preloader';

interface Props {
  menu_id: string;
  menu_name: string | null;
  hideModal: () => void;
  setNewData: () => void;
}

const DeleteMenuModal: React.FC<Props> = ({ menu_id, menu_name, hideModal, setNewData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMenu = async () => {
    try {
      setIsLoading(true);
      await axiosApi.delete('menus/' + menu_id);

      setNewData();
      hideModal();
    } catch {
      // nothing
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={isLoading ? undefined : hideModal}></div>

      <div className={styles.modal}>
        <p>
          Вы уверены, что хотите удалить меню «<span title={menu_name || undefined}>{menu_name || 'Без названия'}</span>
          »?
        </p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Отмена
          </button>
          <button
            className={[styles.remove_button, 'button-orange'].join(' ')}
            disabled={isLoading}
            onClick={deleteMenu}
          >
            {isLoading ? <Preloader color="#fff" scale={0.8} margin="0" /> : 'Удалить'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteMenuModal;
