import { XIcon } from '@heroicons/react/solid';

type XButtonProps = {
  onClick: () => void;
};

function XButton({ onClick }: XButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
    >
      <XIcon className="h-5 w-5 text-gray-600" />
    </button>
  );
}

export default XButton;
