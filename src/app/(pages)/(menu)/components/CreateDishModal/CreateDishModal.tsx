import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Select from '@/app/(pages)/(menu)/components/UI/Select/Select';
import { ICategory, IDish } from '@/app/(pages)/(menu)/types';
import styles from './CreateDishModal.module.css';
import uploadImageIcon from '@/assets/images/upload-image.svg';

interface Props {
  hideModal: () => void;
  submitData(dish: IDish): Promise<void>;
  categories: ICategory[];
}

const initialState: IDish = {
  category: '',
  name: '',
  weight: '',
  price: '',
  oldPrice: '',
  calories: '',
  proteinAndFatAndCarbohydrates: '',
  preparationTime: '',
  description: '',
  image: '',
};

const CreateDishModal: React.FC<Props> = ({ hideModal, submitData, categories }) => {
  const [state, setState] = useState<IDish>(initialState);

  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });

    if (categories.length) {
      setState((prevState) => ({ ...prevState, category: categories[0]._id! }));
    }
  }, [categories]);

  const formatNumericInput = (input: string): string => input.replace(/[^0-9]/g, '');

  const formatProteinAndFatAndCarbohydrates = (input: string): string =>
    input
      .replace(/[^0-9/]/g, '')
      .replace(/^\/+/, '')
      .replace(/\/{3,}/g, '//')
      .replace(/\/{2,}/g, '/')
      .split('/')
      .slice(0, 3)
      .join('/');

  const formatters: { [key: string]: (input: string) => string } = {
    weight: formatNumericInput,
    price: formatNumericInput,
    oldPrice: formatNumericInput,
    calories: formatNumericInput,
    preparationTime: formatNumericInput,
    proteinAndFatAndCarbohydrates: formatProteinAndFatAndCarbohydrates,
  };

  const changeValue = (e: { target: { name: string; value?: string; files?: FileList | null } }) => {
    let { name, value, files } = e.target;

    value = value?.trimStart();

    if (value && formatters[name]) {
      value = formatters[name](value);
    }

    setState((prevState) => ({ ...prevState, [name]: files?.length ? files[0] : value }));
  };

  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    const keys = Object.keys(state) as Array<keyof IDish>;
    keys.forEach((key) => {
      if (state[key] === '' && key !== 'oldPrice') {
        isValid = false;
      }
    });

    if (!isValid) {
      return alert('Fill in all the fields!');
    }

    try {
      await submitData(state);
    } catch {
      // nothing
    } finally {
      hideModal();
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideModal}></div>
      <form autoComplete="off" className={styles.form} onSubmit={saveData}>
        <h2>Добавить блюдо</h2>

        <p className={styles.section_label}>Выбрать категорию</p>
        <Select
          options={categories.map((category) => ({ label: category.name, value: category._id || '' }))}
          name="category"
          onChange={changeValue}
          currentOption={(() => {
            const category = categories.find((item) => item._id === state.category);

            return (
              category && {
                label: category.name,
                value: category._id!,
              }
            );
          })()}
          className={styles.select}
        />

        <div className={styles.section}>
          <div>
            <p className={styles.section_label}>Название</p>
            <input type="text" name="name" value={state.name} onChange={changeValue} />
          </div>

          <div>
            <p className={styles.section_label}>Граммовки</p>
            <input
              type="text"
              name="weight"
              value={state.weight}
              onChange={(e) => e.target.value.length <= 6 && changeValue(e)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <div>
            <p className={styles.section_label}>Цена</p>
            <input
              type="text"
              name="price"
              value={state.price}
              onChange={(e) => e.target.value.length <= 7 && changeValue(e)}
            />
          </div>

          <div>
            <p className={styles.section_label}>Старая цена</p>
            <input
              type="text"
              name="oldPrice"
              value={state.oldPrice}
              onChange={(e) => e.target.value.length <= 7 && changeValue(e)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <div>
            <p className={styles.section_label}>Калории</p>
            <input type="text" name="calories" value={state.calories} onChange={changeValue} />
          </div>

          <div>
            <p className={styles.section_label}>Белки/Жиры/Углеводы</p>
            <input
              type="text"
              name="proteinAndFatAndCarbohydrates"
              value={state.proteinAndFatAndCarbohydrates}
              onChange={changeValue}
            />
          </div>
        </div>

        <div className={styles.section}>
          <div>
            <p className={styles.section_label}>Время приготовления, мин.</p>
            <input type="text" name="preparationTime" value={state.preparationTime} onChange={changeValue} />
          </div>

          <div></div>
        </div>

        <p className={styles.section_label}>Описание</p>
        <textarea name="description" value={state.description} onChange={changeValue} rows={8} />

        <p className={styles.section_label}>Фотография (JPG, PNG)</p>
        <div
          className={styles.drop_zone}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragOver) setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragOver) setIsDragOver(false);
          }}
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

export default CreateDishModal;
