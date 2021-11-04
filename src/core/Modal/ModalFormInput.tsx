import { ChangeEventHandler } from 'react';

type ModalFormInputProps = {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required: boolean;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ModalFormInput = ({
  label,
  name,
  type,
  autoComplete,
  required,
  value,
  onChange,
}: ModalFormInputProps) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <span className="text-sm text-gray-500" id="email-optional">
          {required ? '' : 'Optional'}
        </span>
      </div>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete || 'off'}
          value={value}
          onChange={onChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          required={required}
        />
      </div>
    </div>
  );
};

export default ModalFormInput;
