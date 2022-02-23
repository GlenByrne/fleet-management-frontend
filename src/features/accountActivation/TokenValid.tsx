import Link from 'next/link';
import router from 'next/router';
import React from 'react';

const TokenValid = () => {
  return (
    <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 justify-center">
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
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Account activated
            </h1>
            <p className="mt-2 text-base text-gray-500">
              You can now log into your account
            </p>
            <div className="mt-6">
              <a
                className="cursor-pointer text-base font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => router.push('/login')}
              >
                Go back to login<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenValid;
