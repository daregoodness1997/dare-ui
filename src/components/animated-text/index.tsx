import React from 'react';
import './styles.css';

const AnimatedText = () => {
  return (
    <div className='text-wrapper'>
      <div className='string'>
        <h1 className='greeting one'>Processing...</h1>
        <h1 className='greeting two'>Checking...</h1>
      </div>
    </div>
  );
};

export default AnimatedText;
