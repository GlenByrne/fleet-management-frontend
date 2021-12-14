import { PencilIcon } from '@heroicons/react/solid';

type EditButtonProps = {
  onClick: () => void;
};

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
    >
      <PencilIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default EditButton;
