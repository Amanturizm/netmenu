'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Tabs from '@/app/(pages)/(authentication)/components/tabs/Tabs';
import TextField from '@/app/components/UI/TextField/TextField';
import { Authentication } from '@/app/(pages)/(authentication)/types';
import auth_styles from '../authentication.module.css';

const initialState: Authentication = {
  email: '',
  password: '',
};

const Page = () => {
  const [state, setState] = useState<Authentication>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendData = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Tabs />

      <div className={auth_styles.auth_block}>
        <h2>Вход</h2>

        <form className={auth_styles.form} onSubmit={sendData}>
          <TextField name="email" value={state.email} onChange={changeValue} label="Введите почту" required />
          <TextField name="password" value={state.password} onChange={changeValue} label="Введите пароль" required />

          <Link href="/password-recovery" className={auth_styles.link_password_recovery}>
            Забыли пароль?
          </Link>

          <button className={[auth_styles.submit_button, 'button-orange'].join(' ')} style={{ padding: '12px 80px' }}>
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
