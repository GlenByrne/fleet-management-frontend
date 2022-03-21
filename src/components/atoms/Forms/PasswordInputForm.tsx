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

function PasswordInputForm({
  type,
  name,
  id,
  autoComplete,
  value,
  onChange,
  required,
}: PasswordInputFormProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={autoComplete || 'off'}
      value={value}
      onChange={onChange}
      className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required={required}
    />
  );
}

export default PasswordInputForm;
