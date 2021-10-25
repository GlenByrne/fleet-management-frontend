import { PlusSmIcon } from '@heroicons/react/solid';

type QuickActionButtonProps = {
  label: string;
  onClick: (state: boolean) => void;
};

const QuickActionButton = ({ label, onClick }: QuickActionButtonProps) => {
  return (
    <button
      type="button"
      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
      onClick={() => onClick(true)}
    >
      <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
};

export default QuickActionButton;
