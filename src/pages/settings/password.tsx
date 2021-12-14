import client, {
  accessTokenVar,
  loggedInUserVar,
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import SettingsLayout from '@/core/Layout/SettingsLayout/SettingsLayout';
import PasswordInput from '@/components/Atomic/molecules/PasswordInput';
import {
  useChangePasswordMutation,
  useLogoutMutation,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState, FormEventHandler } from 'react';

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
    <SettingsLayout>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <form onSubmit={submitHandler}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
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
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </SettingsLayout>
  );
};

export default Password;
