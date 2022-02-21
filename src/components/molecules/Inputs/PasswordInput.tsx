import InputForm from '@/components/atoms/Forms/InputForm';
import InputLabel from '@/components/atoms/InputLabel';
import PasswordInputForm from '@/components/atoms/Forms/PasswordInputForm';
import ShowPasswordButton from '@/components/atoms/Button/ShowPasswordButton';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { ChangeEventHandler, useState } from 'react';

type PasswordInputProps = {
  password: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
};

const PasswordInput = ({ password, onChange, label }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const changeShowPasswordState = (newState: boolean) => {
    setShowPassword(newState);
  };

  return (
    <>
      <InputLabel label={label} htmlFor="password" />
      <div className="mt-1 flex rounded-md shadow-sm">
        <PasswordInputForm
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
          required
        />
        <ShowPasswordButton
          showPassword={showPassword}
          changeShowPasswordState={changeShowPasswordState}
        />
      </div>
    </>
  );
};

export default PasswordInput;
