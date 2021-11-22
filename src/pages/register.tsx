import { useState } from 'react';
import { NextPage } from 'next';
import { FormEventHandler, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PasswordInput from 'core/Modal/PasswordInput';
import { useAddOrganisationMutation } from 'generated/graphql';

const Register: NextPage = () => {
  const router = useRouter();
  const [organisationName, setOrganisationName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addOrganisation] = useAddOrganisationMutation({
    onCompleted: () => {
      router.push('/');
      setOrganisationName('');
      setAdminName('');
      setEmail('');
      setPassword('');
    },
  });

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    addOrganisation({
      variables: {
        data: {
          name: organisationName,
          adminName: adminName,
          email: email,
          password: password,
        },
      },
    });
  };

  const changeOrganisationName = (event: FormEvent<HTMLInputElement>) => {
    setOrganisationName(event.currentTarget.value);
  };

  const changeAdminName = (event: FormEvent<HTMLInputElement>) => {
    setAdminName(event.currentTarget.value);
  };

  const changeEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
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
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your account
              </a>
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="organisationName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organisation Name
                </label>
                <div className="mt-1">
                  <input
                    id="organisationName"
                    name="organisationName"
                    type="organisationName"
                    autoComplete="organisationName"
                    value={organisationName}
                    onChange={changeOrganisationName}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="adminName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin Account Name
                </label>
                <div className="mt-1">
                  <input
                    id="adminName"
                    name="adminName"
                    type="adminName"
                    autoComplete="adminName"
                    value={adminName}
                    onChange={changeAdminName}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={changeEmail}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <PasswordInput password={password} onChange={changePassword} />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
