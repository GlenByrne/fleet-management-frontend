import { PlusSmIcon } from '@heroicons/react/solid';

type CircularAddButtonProps = {
  onClick: () => void;
  label: string;
};

function CirclularAddButton({ onClick, label }: CircularAddButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onClick}
    >
      <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default CirclularAddButton;
