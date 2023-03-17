import React, { InputHTMLAttributes, SyntheticEvent } from 'react';
import './styles.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  state?: 'regualar' | 'error' | 'warning' | 'verifying';
  name?: string;
  label?: string;
  error?: boolean;
  onChange?: (e?: SyntheticEvent) => void;
}

export const Input: React.FC<Props> = ({
  state,
  name,
  label,
  error,
  onChange,
  ...props
}) => {
  return (
    <div className='form-control'>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <div className='form-wrapper'>
        <input
          name={name}
          onChange={onChange}
          {...props}
          className={`input ${state === 'error' && 'error'} ${
            state === 'warning' && 'warning'
          }`}
        />
      </div>

      {error ? <div>{error}</div> : null}
    </div>
  );
};
