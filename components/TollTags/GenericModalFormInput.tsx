import { FC, Fragment } from 'react';

type ModalFormInputProps = {
  title: string;
  name: string;
  type: string;
  ref: any;
  required: boolean;
};

const ModalFormInput: FC<ModalFormInputProps> = ({
  title,
  name,
  type,
  ref,
  required,
}) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        ref={(value) => (ref = value)}
        type={type}
        name={name}
        id={name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        required={required}
      />
    </div>
  );
};

export default ModalFormInput;
