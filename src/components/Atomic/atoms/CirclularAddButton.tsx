import { PlusSmIcon } from '@heroicons/react/solid';

type CircularAddButtonProps = {
  onClick: () => void;
  label: string;
};

const CirclularAddButton = ({ onClick, label }: CircularAddButtonProps) => {
  return (
    <button
      type="button"
      className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default CirclularAddButton;
