type NoListItemButtonProps = {
  onClick: (state: boolean) => void;
  d: string;
  text: string;
};

const NoListItemButton = ({ onClick, d, text }: NoListItemButtonProps) => {
  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => onClick(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={d}
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-900">
        {text}
      </span>
    </button>
  );
};

export default NoListItemButton;
