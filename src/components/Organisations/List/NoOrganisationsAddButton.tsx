type NoOrganisationsAddButtonProps = {
  onClick: (state: boolean) => void;
};

const NoOrganisationsAddButton = ({
  onClick,
}: NoOrganisationsAddButtonProps) => {
  return (
    <button
      type="button"
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Add a new Organisation
      </span>
    </button>
  );
};

export default NoOrganisationsAddButton;
