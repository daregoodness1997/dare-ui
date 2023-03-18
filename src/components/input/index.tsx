import React, { InputHTMLAttributes, SyntheticEvent } from 'react';
import AnimatedText from '../animated-text';
import Spinner from '../spinner';
import './styles.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  state?: 'regualar' | 'error' | 'warning' | 'verifying';
  name?: string;
  label?: string;
  isError?: boolean;
  onChange?: (e?: SyntheticEvent) => void;
  isDisabled?: boolean;
  isProcessing?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  helperText?: string;
}

export const Input: React.FC<Props> = ({
  state,
  name,
  label,
  isError: error,
  onChange,
  isDisabled,
  isProcessing,
  isSuccess,
  isWarning,
  helperText,
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
      {isProcessing ? (
        <div className='helper-box'>
          <Spinner size='sm' />{' '}
          <small>
            <AnimatedText />
          </small>
        </div>
      ) : null}
      {isSuccess ? <div>Is Success...</div> : null}
      {isWarning ? <div>Is Warning...</div> : null}
      {/* {helperText ? <div>{helperText}</div> : null} */}
    </div>
  );
};
