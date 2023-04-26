import React from 'react';

export const useEscapeKey = (callback) => {
  React.useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        callback();
      }
    });

    return () => {
      window.removeEventListener('keydown', callback);
    };
  });
};
