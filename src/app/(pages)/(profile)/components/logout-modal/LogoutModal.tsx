import React, { useState } from 'react';
import styles from './LogoutModal.module.css';
import axiosApi from '@/app/axiosApi';
import { useRouter } from 'next/navigation';
import Preloader from '@/app/components/UI/Preloader/Preloader';

interface Props {
  hideModal: () => void;
}

const LogoutModal: React.FC<Props> = ({ hideModal }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      await axiosApi.delete('users/sessions');
    } catch {
      // nothing
    } finally {
      localStorage.removeItem('user');
      setIsLoading(false);
      hideModal();
      router.push('/sign-in');
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={isLoading ? undefined : hideModal}></div>

      <div className={styles.modal}>
        <p>Вы уверены, что хотите выйти?</p>

        <div>
          <button className={styles.cancel_button} onClick={hideModal}>
            Передумал
          </button>
          <button className={[styles.remove_button, 'button-orange'].join(' ')} disabled={isLoading} onClick={logout}>
            {isLoading ? <Preloader color="#fff" scale={0.8} margin="0" /> : 'Выйти'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
