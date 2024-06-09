import React, { ChangeEventHandler } from 'react';
import styles from './TextField.module.css';

interface Props {
  name: string;
  value: string;
  onChange: ChangeEventHandler;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const TextField: React.FC<Props> = ({ name, value, onChange, label, placeholder, required }) => {
  return (
    <div className={styles.text_field}>
      <span>{label}</span>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  );
};

export default TextField;
