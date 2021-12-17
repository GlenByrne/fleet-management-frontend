import { XIcon } from '@heroicons/react/solid';

type XButtonProps = {
  onClick: () => void;
};

const XButton = ({ onClick }: XButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        'inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500'
      }
    >
      <XIcon className="w-5 h-5 text-gray-600" />
    </button>
  );
};

export default XButton;
