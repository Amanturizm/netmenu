import React from 'react';
import styles from './DeleteMenuModal.module.css';
import axiosApi from '@/app/axiosApi';

interface Props {
  menu_id: string;
  menu_name: string | null;
  hideModal: () => void;
  setNewData: () => void;
}

const DeleteMenuModal: React.FC<Props> = ({ menu_id, menu_name, hideModal, setNewData }) => {
  const deleteMenu = async () => {
    try {
      await axiosApi.delete('menus/' + menu_id);

      setNewData();
      hideModal();
    } catch {
      // nothing
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>

      <div className={styles.modal}>
        <p>
          Вы уверены, что хотите удалить меню «<span title={menu_name || undefined}>{menu_name || 'Без названия'}</span>
          »?
        </p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Отмена
          </button>
          <button className={[styles.remove_button, 'button-orange'].join(' ')} onClick={deleteMenu}>
            Удалить
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteMenuModal;
