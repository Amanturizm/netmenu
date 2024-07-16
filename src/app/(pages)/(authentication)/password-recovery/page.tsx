'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@/app/components/UI/TextField/TextField';
import auth_styles from '../authentication.module.css';
import axiosApi from '@/app/axiosApi';
import Tabs from '@/app/(pages)/(authentication)/components/tabs/Tabs';
import Preloader from '@/app/components/UI/Preloader/Preloader';

const Page = () => {
  const router = useRouter();

  const [state, setState] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axiosApi.post('users/password-reset', { email: state });

      router.push('/password-recovery-confirmation');
    } catch {
      // noting
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tabs />

      <div className={auth_styles.auth_block}>
        <h2>Восстановление</h2>

        <form className={auth_styles.form} onSubmit={sendData}>
          <TextField
            name="email"
            value={state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
            label="Введите почту, указанную при регистрации"
            required
          />

          <button className={[auth_styles.submit_button, 'button-orange'].join(' ')} disabled={isLoading}>
            {isLoading ? <Preloader color="#fff" scale={0.8} /> : 'Восстановить пароль'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
