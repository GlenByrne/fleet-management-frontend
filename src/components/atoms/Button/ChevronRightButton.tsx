import { ChevronRightIcon } from '@heroicons/react/solid';

type ChevronRightButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className: string;
};

function ChevronRightButton({
  onClick,
  disabled,
  className,
}: ChevronRightButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={className}
    >
      <ChevronRightIcon className="h-5 w-5 text-gray-600" />
    </button>
  );
}

export default ChevronRightButton;
