import {
  ChangeEventHandler,
  Dispatch,
  forwardRef,
  SetStateAction,
} from 'react';

type ModalFormInputProps = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ModalFormInput = ({
  label,
  name,
  type,
  required,
  value,
  onChange,
}: ModalFormInputProps) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {/* <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        required={required}
      /> */}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        required={required}
      />
    </div>
  );
};

export default ModalFormInput;
