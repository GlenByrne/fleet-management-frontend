import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

type ShowPasswordButtonProps = {
  showPassword: boolean;
  changeShowPasswordState: (newState: boolean) => void;
};

const ShowPasswordButton = ({
  showPassword,
  changeShowPasswordState,
}: ShowPasswordButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => changeShowPasswordState(!showPassword)}
      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      {showPassword ? (
        <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      ) : (
        <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      )}
    </button>
  );
};

export default ShowPasswordButton;
