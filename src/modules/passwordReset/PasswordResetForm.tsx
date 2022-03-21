import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import PasswordInput from '@/components/molecules/Inputs/PasswordInput';
import { useResetPasswordMutation } from '@/generated/graphql';

function PasswordResetForm() {
  const router = useRouter();
  const token = String(router.query.passwordResetId);
  const [password, setPassword] = useState('');

  const [resetPassword] = useResetPasswordMutation({
    onCompleted: ({ resetPassword }) => {
      router.push('/login');
      setPassword('');
    },
  });

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    resetPassword({
      variables: {
        data: {
          resetPasswordToken: token,
          newPassword: password,
        },
      },
    });
  };

  const changePassword = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  return (
    <>
      {/*
          This example requires updating your template:
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Password Reset
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <PasswordInput
                  password={password}
                  onChange={changePassword}
                  label="Password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordResetForm;
