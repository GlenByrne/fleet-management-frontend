import { ChevronRightIcon } from '@heroicons/react/solid';

type ChevronRightButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className: string;
};

const ChevronRightButton = ({
  onClick,
  disabled,
  className,
}: ChevronRightButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={className}
    >
      <ChevronRightIcon className="w-5 h-5 text-gray-600" />
    </button>
  );
};

export default ChevronRightButton;
