import React from 'react';

//UI Components : iptSlt

const sizeClassMap = {
  xs: 'frmXs',
  sm: 'frmSm',
  md: 'frmMd',
  lg: 'frmLg',
  half: 'frmHalf',
  thrd: 'frmThrd',
  frth: 'frmFrth',
};

const Select = ({
  id,
  name,
  title = '',
  value = '',
  onChange,
  options = [],
  size = '',
  placeholder = '선택',
  disabled = false,
  className = '',
  ...rest
}) => {
  const sizeClass = sizeClassMap[size] || '';
  const selectClass = `iptSlt ${sizeClass} ${className}`.trim();

  return (
    <select
      id={id}
      name={name}
      title={title}
      className={selectClass}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option
          key={option.value ?? `${option.label}-${index}`}
          value={option.value ?? option.label}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
