import { XIcon } from '@heroicons/react/solid';

type CloseSideNavButtonProps = {
  onClick: () => void;
};

const CloseSideNavButton = ({ onClick }: CloseSideNavButtonProps) => {
  return (
    <button
      type="button"
      className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
      onClick={onClick}
    >
      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
      <span className="sr-only">Close sidebar</span>
    </button>
  );
};

export default CloseSideNavButton;
