'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@/app/components/UI/TextField/TextField';
import auth_styles from '../authentication.module.css';
import axiosApi from '@/app/axiosApi';
import Tabs from '@/app/(pages)/(authentication)/components/tabs/Tabs';

const Page = () => {
  const router = useRouter();

  const [state, setState] = useState<string>('');

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosApi.post('users/password-reset', { email: state });

      router.push('/password-recovery-confirmation');
    } catch {
      // noting
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

          <button className={[auth_styles.submit_button, 'button-orange'].join(' ')} style={{ padding: '12px 52px' }}>
            Восстановить пароль
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
