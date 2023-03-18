import React from 'react';
import './styles.css';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<Props> = ({ size }) => {
  return (
    <div className='spin-wrapper'>
      <div className={`spin ${size}`}></div>
    </div>
  );
};

export default Spinner;
