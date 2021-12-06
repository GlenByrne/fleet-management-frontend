import Loading from 'core/Loading';
import { useActivateAccountMutation } from 'generated/graphql';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AccountActivation: NextPage = () => {
  const [activating, setActivating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const token = String(router.query.activationId);

  const [activateAccount] = useActivateAccountMutation({
    variables: {
      data: {
        token,
      },
    },
  });

  useEffect(() => {
    async function handleAccountActivation() {
      const isValid = await activateAccount();
      if (isValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      setActivating(false);
    }

    handleAccountActivation();
  }, [activateAccount]);

  if (activating) {
    return <Loading />;
  }

  return isValid ? (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/vehicles">
              <a className="inline-flex">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Account activated
              </h1>
              <p className="mt-2 text-base text-gray-500">
                You can now log into your account
              </p>
              <div className="mt-6">
                <a
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={() => router.push('/login')}
                >
                  Go back to login<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/vehicles">
              <a className="inline-flex">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Account could not be activated
              </h1>
              <p className="mt-2 text-base text-gray-500">
                The link that you used may have expired
              </p>
              <p className="mt-2 text-base text-gray-500">
                Dont worry, you can just register again with the same email.
              </p>
              <div className="mt-6">
                <a
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={() => router.push('/login')}
                >
                  Go back to login<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AccountActivation;
