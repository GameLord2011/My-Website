import React from 'react';

export default function ErrorThrower() {
  const handleClick = () => {
    throw new Error('This is a test error');
  };

  return (
    <button onClick={handleClick}>
      Throw Error
    </button>
  );
}