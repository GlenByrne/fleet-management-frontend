import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { ChangeEventHandler, useState } from 'react';

type PasswordInputProps = {
  password: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const PasswordInput = ({ password, onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
          required
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
