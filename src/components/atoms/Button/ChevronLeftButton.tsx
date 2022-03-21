import { ChevronLeftIcon } from '@heroicons/react/solid';

type ChevronLeftButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className: string;
};

function ChevronLeftButton({
  onClick,
  disabled,
  className,
}: ChevronLeftButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={className}
    >
      <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
    </button>
  );
}

export default ChevronLeftButton;
