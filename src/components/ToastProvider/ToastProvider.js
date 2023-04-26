import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [toastVariant, setToastVariant] = React.useState('notice');

  function handleDismiss(toastId) {
    const newToasts = toasts.filter((toast) => toast.id !== toastId);

    setToasts(newToasts);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!message) {
      return;
    }
    const newToasts = toasts.concat({
      variant: toastVariant,
      message,
      id: crypto.randomUUID(),
    });
    setToasts(newToasts);
    setMessage('');
    setToastVariant('notice');
  }

  function clearToasts() {
    setToasts([]);
  }

  React.useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        clearToasts();
      }
    });

    return () => {
      window.removeEventListener('keydown', clearToasts);
    };
  });

  const value = {
    toasts,
    setToasts,
    toastVariant,
    setToastVariant,
    message,
    setMessage,
    handleDismiss,
    handleSubmit,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
