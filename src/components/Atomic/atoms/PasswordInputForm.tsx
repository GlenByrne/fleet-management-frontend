import { ChangeEventHandler } from 'react';

type PasswordInputFormProps = {
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required: boolean;
};

const PasswordInputForm = ({
  type,
  name,
  id,
  autoComplete,
  value,
  onChange,
  required,
}: PasswordInputFormProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={autoComplete || 'off'}
      value={value}
      onChange={onChange}
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
      required={required}
    />
  );
};

export default PasswordInputForm;
