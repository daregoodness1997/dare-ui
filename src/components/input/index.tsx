import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  namme?: string;
  label?: string;
}

export const Input: React.FC<Props> = ({ error, name, label, ...props }) => {
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input name={name} {...props} />
      {error ? <div>{error}</div> : null}
    </div>
  );
};
