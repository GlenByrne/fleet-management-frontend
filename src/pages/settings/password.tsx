import { NextPage } from 'next';
import PasswordInput from '@/components/molecules/PasswordInput';
import PasswordSettingsTemplate from '@/components/templates/PasswordSettingsTemplate';
import {
  useLogoutMutation,
  useChangePasswordMutation,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState, FormEvent, FormEventHandler } from 'react';
import {
  successTextVar,
  successAlertStateVar,
  accessTokenVar,
  loggedInUserVar,
} from 'src/apollo/apollo-client';

const Password: NextPage = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [logOut] = useLogoutMutation();

  const [changePassword] = useChangePasswordMutation({
    onCompleted: ({ changePassword }) => {
      successTextVar(changePassword.message);
      successAlertStateVar(true);
      logOut();
      accessTokenVar(null);
      loggedInUserVar(null);
      router.push('/login');
      client.clearStore();
      setCurrentPassword('');
      setNewPassword('');
    },
  });

  const changeCurrentPassword = (event: FormEvent<HTMLInputElement>) => {
    setCurrentPassword(event.currentTarget.value);
  };

  const changeNewPassword = (event: FormEvent<HTMLInputElement>) => {
    setNewPassword(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await changePassword({
        variables: {
          data: {
            currentPassword,
            newPassword,
          },
        },
      });
    } catch {}
  };
  return (
    <PasswordSettingsTemplate>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form onSubmit={submitHandler}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Change Password
              </h3>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <PasswordInput
                    password={currentPassword}
                    onChange={changeCurrentPassword}
                    label="Current Password"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <PasswordInput
                    password={newPassword}
                    onChange={changeNewPassword}
                    label="Current Password"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </PasswordSettingsTemplate>
  );
};

export default Password;
