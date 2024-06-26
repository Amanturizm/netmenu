'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './advertisers.module.css';
import uploadImageIcon from '@/assets/images/upload-image.svg';
import axiosApi from '@/app/axiosApi';
import { User } from '@/app/types';
import { s3Url } from '@/app/constants';
import DeleteAdModal from '@/app/(pages)/(profile)/components/delete-ad-modal/DeleteAdModal';

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [image, setImage] = useState<string>('');

  const [isDropZone, setIsDropZone] = useState<boolean>(false);

  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    setImage(user?.adImage || '');
  }, []);

  const setAdImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('adImage', file);

      const { data } = await axiosApi.patch<User>('users', formData);
      localStorage.setItem('user', JSON.stringify(data));
      setImage(data.adImage || '');
      setIsDropZone(false);
    } catch {
      // nothing
    }
  };

  return (
    <div className="wrapper">
      <h2 className={styles.title}>Размещение рекламы</h2>

      {!image || (image && isDropZone) ? (
        <div className={styles.drop_zone_wrapper}>
          <div
            className={styles.drop_zone}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              if (!isDragOver) setIsDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              if (isDragOver) setIsDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const { files } = e.dataTransfer;

              const validFileTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];

              if (!files || !files.length) return;

              if (!validFileTypes.includes(files[0].type)) {
                alert('Недопустимый формат файла.');
                return;
              }

              void setAdImage(files[0]);
            }}
          >
            <div>
              <Image src={uploadImageIcon.src} width={54} height={54} alt="upload-icon" />
              <span>Прикрепить фото рекламы</span>
            </div>

            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png, .svg, .webp"
              ref={fileInputRef}
              onChange={(e) => e.target.files && e.target.files.length && setAdImage(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </div>

          {image && isDropZone && (
            <button className={styles.cancel_button} onClick={() => setIsDropZone(false)}>
              Отмена
            </button>
          )}
        </div>
      ) : (
        <div className={styles.ad_wrapper}>
          <Image className={styles.ad_image} src={s3Url + image} width={390} height={270} alt="ad-img" />

          <div className={styles.ad_buttons}>
            <button onClick={() => setIsDropZone(true)}>Изменить фото рекламы</button>
            <button onClick={() => setIsDeleteModal(true)}>Удалить рекламу</button>
          </div>
        </div>
      )}

      {isDeleteModal && <DeleteAdModal hideModal={() => setIsDeleteModal(false)} resetState={() => setImage('')} />}
    </div>
  );
};

export default Page;
