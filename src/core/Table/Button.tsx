import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="rounded-lg bg-indigo-500 py-2 px-4 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
