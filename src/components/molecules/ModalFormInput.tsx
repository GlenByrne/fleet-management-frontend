import InputForm from '@/components/atoms/InputForm';
import FormLabel from '@/components/atoms/InputLabel';
import OptionalFormText from '@/components/atoms/OptionalFormText';
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
    <>
      <div className="flex justify-between">
        <FormLabel label={label} htmlFor={name} />
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
};

export default ModalFormInput;
