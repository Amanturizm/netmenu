import React from 'react';
import styles from './LogoutModal.module.css';
import axiosApi from '@/app/axiosApi';
import { useRouter } from 'next/navigation';

interface Props {
  hideModal: () => void;
}

const LogoutModal: React.FC<Props> = ({ hideModal }) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axiosApi.delete('users/sessions');
    } catch {
      // nothing
    } finally {
      localStorage.removeItem('user');
      hideModal();
      router.push('/sign-in');
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>

      <div className={styles.modal}>
        <p>Вы уверены, что хотите выйти?</p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Передумал
          </button>
          <button className={[styles.remove_button, 'button-orange'].join(' ')} onClick={logout}>
            Выйти
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
