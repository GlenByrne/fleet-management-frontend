import { ChangeEventHandler } from 'react';
import InputForm from '@/components/atoms/Forms/InputForm';
import InputLabel from '@/components/atoms/InputLabel';
import OptionalFormText from '@/components/atoms/OptionalFormText';

type ModalFormInputProps = {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required: boolean;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function ModalFormInput({
  label,
  name,
  type,
  autoComplete,
  required,
  value,
  onChange,
}: ModalFormInputProps) {
  return (
    <>
      <div className="flex justify-between">
        <InputLabel label={label} htmlFor={name} />
        <OptionalFormText required={required} />
      </div>
      <div className="mt-1">
        <InputForm
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete || 'off'}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  );
}

export default ModalFormInput;
