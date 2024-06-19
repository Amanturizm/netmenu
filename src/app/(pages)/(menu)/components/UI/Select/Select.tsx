import React from 'react';
import ReactSelect from 'react-select';
import chevronDownIcon from '@/assets/images/chevron-down.svg';

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  options: SelectOption[];
  currentOption?: SelectOption | null;
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  className?: string;
}

const Select: React.FC<Props> = ({ options, currentOption, name, onChange, className }) => {
  return (
    <ReactSelect
      inputId={'text-field-' + name}
      className={[className].join(' ')}
      name={name}
      options={options}
      value={currentOption || options[0]}
      onChange={(newValue) =>
        newValue &&
        onChange({
          target: {
            name,
            value: newValue.value,
          },
        })
      }
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: '185px',
          height: '36px',
          padding: '0 15px',
          borderRadius: 10,
          borderColor: state.isFocused ? '#000' : '#756C6C',
          boxShadow: 'none',
          ':hover': {
            borderColor: state.isFocused ? '#000' : '#756C6C',
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: 10,
          width: '185px',
          overflow: 'hidden',
          border: '1px solid #999999',
          boxShadow: 'none',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          padding: 0,
          fontFamily: 'var(--font-family-medium)',
          fontWeight: 400,
          fontSize: 16,
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          margin: 0,
          padding: 0,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          padding: '6px 15px',
          backgroundColor: state.isSelected ? '#ff9942' : '#fff',
          ':active': {
            backgroundColor: '#ff9942',
            color: '#fff',
          },
          ':hover': {
            backgroundColor: '#ffa85e',
            color: '#fff',
            cursor: 'pointer',
          },
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: '#000',
          padding: 0,
          ':hover': {
            color: '#000',
          },
          svg: {
            display: 'none',
          },
          '&:before': {
            content: '""',
            display: 'inline-block',
            width: '20px',
            height: '20px',
            backgroundImage: `url(${chevronDownIcon.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: 0,
          },
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: 'none !important',
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: 0,
        }),
        singleValue: (baseValue) => ({
          ...baseValue,
          minWidth: 20,
          fontFamily: 'var(--font-family-medium)',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '24px',
          color: '#000',
        }),
      }}
    />
  );
};

export default Select;
