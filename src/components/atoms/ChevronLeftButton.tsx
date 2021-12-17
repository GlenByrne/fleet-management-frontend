import { ChevronLeftIcon } from '@heroicons/react/solid';

type ChevronLeftButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className: string;
};

const ChevronLeftButton = ({
  onClick,
  disabled,
  className,
}: ChevronLeftButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={className}
    >
      <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
    </button>
  );
};

export default ChevronLeftButton;
