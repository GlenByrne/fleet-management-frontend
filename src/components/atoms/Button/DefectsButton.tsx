import { ExclamationIcon } from '@heroicons/react/solid';

type DefectsButtonProps = {
  onClick: () => void;
};

function DefectsButton({ onClick }: DefectsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-indigo-500 py-2 px-4 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
    >
      <ExclamationIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}

export default DefectsButton;
