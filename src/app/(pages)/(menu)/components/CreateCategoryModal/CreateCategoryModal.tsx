import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ICategory } from '@/app/(pages)/(menu)/types';
import styles from './CreateCategoryModal.module.css';
import uploadImageIcon from '@/assets/images/upload-image.svg';

interface Props {
  hideModal: () => void;
}

const initialState: ICategory = {
  groupName: 'Еда',
  name: '',
  image: '',
};

const CreateCategoryModal: React.FC<Props> = ({ hideModal }) => {
  const [state, setState] = useState<ICategory>(initialState);

  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const changeValue = (e: { target: { name: string; value?: string; files: FileList | null } }) => {
    const { name, value, files } = e.target;

    setState((prevState) => ({ ...prevState, [name]: files?.length ? files[0] : value }));
  };

  const saveData = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(state);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>
      <form className={styles.form} onSubmit={saveData}>
        <h2>Добавить категорию</h2>

        <p className={styles.section_label}>Выберите группу</p>
        <div className={styles.menu_navigation_tabs}>
          <div
            className={state.groupName === 'Еда' ? styles.in_active : undefined}
            style={{ padding: '11px 45px' }}
            onClick={() => changeValue({ target: { name: 'groupName', value: 'Еда', files: null } })}
          >
            Еда
          </div>
          <div
            className={state.groupName === 'Напитки' ? styles.in_active : undefined}
            style={{ padding: '11px 32px' }}
            onClick={() => changeValue({ target: { name: 'groupName', value: 'Напитки', files: null } })}
          >
            Напитки
          </div>
        </div>

        <p className={styles.section_label}>Название</p>
        <input type="text" name="name" value={state.name} onChange={changeValue} />

        <p className={styles.section_label}>Фотография (JPG, PNG)</p>
        <div
          className={styles.drop_zone}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!isDragOver) {
              setIsDragOver(true);
            }
          }}
          onDragLeave={() => isDragOver && setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            const { files } = e.dataTransfer;

            const validFileTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];

            if (!files || !files.length) return;

            const file = files[0];

            if (!validFileTypes.includes(file.type)) {
              alert('Недопустимый формат файла.');
              return;
            }

            setState((prevState) => ({ ...prevState, image: file }));
          }}
        >
          <p>Рекомендуемый формат - 90 x 150</p>

          <div>
            <Image src={uploadImageIcon.src} width={54} height={54} alt="upload-icon" />
            <span>Прикрепить фото</span>
          </div>

          {typeof state.image !== 'string' && <span className={styles.display_file}>{state.image.name}</span>}

          <input
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png, .svg, .webp"
            ref={fileInputRef}
            onChange={(e) =>
              e.target.files &&
              e.target.files.length &&
              changeValue({ target: { name: e.target.name, files: e.target.files } })
            }
            style={{ display: 'none' }}
          />
        </div>

        <div className={styles.save_button}>
          <button>Сохранить</button>
        </div>
      </form>
    </>
  );
};

export default CreateCategoryModal;
