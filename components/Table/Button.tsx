import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
