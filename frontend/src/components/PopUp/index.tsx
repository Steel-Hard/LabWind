import React from 'react';

type AlertProps = {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Alert: React.FC<AlertProps> = ({ title, onClose, children }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center  fixed inset-0 z-40  h-2/4 w-2/4 font-sans">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-4 h-12 w-12 text-[var(--color-primary)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>

      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}

      <div className="mb-6">{children}</div>

      {onClose && (
        <button
          onClick={onClose}
          className="bg-[var(--color-primary)] text-white font-bold py-2 px-6 rounded hover:bg-[var(--color-secondary)] transition"
          aria-label="Fechar alerta"
        >
          Fechar
        </button>
      )}
    </div>
  );
};

export default Alert;
