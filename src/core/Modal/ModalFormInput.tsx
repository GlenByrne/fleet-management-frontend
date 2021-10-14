import { forwardRef } from 'react';

type ModalFormInputProps = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
};

const ModalFormInput = forwardRef<HTMLInputElement, ModalFormInputProps>(
  ({ label, name, type, required, defaultValue }, ref) => {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required={required}
        />
      </div>
    );
  }
);

ModalFormInput.displayName = 'ModalFormInput';

export default ModalFormInput;
