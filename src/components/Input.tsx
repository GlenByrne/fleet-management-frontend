import InputForm from '@/components/atoms/Forms/InputForm';
import InputLabel from '@/components/atoms/InputLabel';
import OptionalFormText from '@/components/atoms/OptionalFormText';
import { ChangeEventHandler } from 'react';

type InputProps = {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required: boolean;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  label,
  name,
  type,
  autoComplete,
  required,
  value,
  onChange,
}: InputProps) => {
  return (
    <>
      <div className="flex justify-between">
        <InputLabel label={label} htmlFor={name} />
        <OptionalFormText required={required} />
      </div>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete || 'off'}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required={required}
        />
      </div>
    </>
  );
};

export default Input;
