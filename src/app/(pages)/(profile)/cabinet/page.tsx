'use client';
import React, { useLayoutEffect, useState } from 'react';
import styles from './cabinet.module.css';
import LogoutModal from '@/app/(pages)/(profile)/components/logout-modal/LogoutModal';
import axiosApi from '@/app/axiosApi';
import Preloader from '@/app/components/UI/Preloader/Preloader';

interface Profile {
  username: string;
  email: string;
}

interface Password {
  newPassword: string;
  newPasswordRepeat: string;
}

const initialProfile: Profile = {
  username: '',
  email: '',
};

const initialPassword: Password = {
  newPassword: '',
  newPasswordRepeat: '',
};

const Page = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [password, setPassword] = useState<Password>(initialPassword);

  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);

  const [profileIsLoading, setProfileIsLoading] = useState<boolean>(false);
  const [passwordIsLoading, setPasswordIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user && user.email) {
      setProfile((prevState) => ({ ...prevState, email: user.email, username: user.username || '' }));
    }
  }, []);

  const changeProfileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const changePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassword((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setProfileIsLoading(true);
      const { data } = await axiosApi.patch('users', profile);
      localStorage.setItem('user', JSON.stringify(data));
    } catch {
      // nothing
    } finally {
      setProfileIsLoading(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.newPassword || !password.newPasswordRepeat) {
      return alert('Все поля обязательны!');
    }

    if (password.newPassword !== password.newPasswordRepeat) {
      return alert('Пароли не совпадают!');
    }

    try {
      setPasswordIsLoading(true);
      const { data } = await axiosApi.patch('users', password);
      localStorage.setItem('user', JSON.stringify(data));
      setPassword(initialPassword);
    } catch {
      // nothing
    } finally {
      setPasswordIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h2 className={styles.title}>Профиль</h2>

      <div className={styles.cards}>
        <form className={styles.card} onSubmit={saveProfile}>
          <h2>Данные пользователя</h2>

          <p>Имя</p>
          <input type="text" name="username" value={profile.username} onChange={changeProfileValue} />

          <p>Почта</p>
          <input type="email" name="email" value={profile.email} onChange={changeProfileValue} />

          <button className={styles.save_button} disabled={profileIsLoading}>
            {profileIsLoading ? <Preloader color="#fff" scale={0.8} margin="0" /> : 'Сохранить изменения'}
          </button>
        </form>

        <form className={styles.card} onSubmit={changePassword}>
          <h2>Изменить пароль</h2>

          <p>Новый пароль</p>
          <input type="text" name="newPassword" value={password.newPassword} onChange={changePasswordValue} />

          <p>Новый пароль повторно</p>
          <input
            type="text"
            name="newPasswordRepeat"
            value={password.newPasswordRepeat}
            onChange={changePasswordValue}
          />

          <button className={styles.change_button} disabled={passwordIsLoading}>
            {passwordIsLoading ? <Preloader color="#fff" scale={0.8} margin="0" /> : 'Изменить пароль'}
          </button>
        </form>
      </div>

      <div className={styles.quit_button}>
        <button onClick={() => setIsLogoutModal(true)}>Выйти</button>
      </div>

      {isLogoutModal && <LogoutModal hideModal={() => setIsLogoutModal(false)} />}
    </div>
  );
};

export default Page;
