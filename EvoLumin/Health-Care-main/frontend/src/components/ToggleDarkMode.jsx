import React from 'react';

const ToggleDarkMode = ({ toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} style={{ margin: '20px' }}>
      Toggle Dark Mode
    </button>
  );
};

export default ToggleDarkMode;
