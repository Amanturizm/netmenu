'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosApi from '@/app/axiosApi';
import Link from 'next/link';
import TextField from '@/app/components/UI/TextField/TextField';
import { Authentication } from '@/app/(pages)/(authentication)/types';
import auth_styles from '../authentication.module.css';
import Tabs from '@/app/(pages)/(authentication)/components/tabs/Tabs';

const initialState: Authentication = {
  email: '',
  password: '',
};

const Page = () => {
  const router = useRouter();

  const [state, setState] = useState<Authentication>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axiosApi.post('users', state);
      localStorage.setItem('user', JSON.stringify(data));

      router.push('/');
    } catch (e) {
      // nothing
    }
  };

  return (
    <>
      <Tabs />

      <div className={auth_styles.auth_block}>
        <h2>Регистрация</h2>

        <form className={auth_styles.form} onSubmit={sendData}>
          <TextField name="email" value={state.email} onChange={changeValue} label="Введите почту" required />
          <TextField name="password" value={state.password} onChange={changeValue} label="Придумайте пароль" required />

          <Link href="/password-recovery" className={auth_styles.link_password_recovery}>
            Забыли пароль?
          </Link>

          <button className={[auth_styles.submit_button, 'button-orange'].join(' ')} style={{ padding: '12px 20px' }}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
