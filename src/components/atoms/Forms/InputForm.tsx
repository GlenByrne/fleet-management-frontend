import { ChangeEventHandler } from 'react';

type InputFormProps = {
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required: boolean;
};

function InputForm({
  type,
  name,
  id,
  autoComplete,
  value,
  onChange,
  required,
}: InputFormProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={autoComplete || 'off'}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      required={required}
    />
  );
}

export default InputForm;
