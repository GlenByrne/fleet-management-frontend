import Link from 'next/link';
import { useRouter } from 'next/router';

const AlreadyLoggedIn = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
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
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Mate
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Your&apos;e already logged in.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                You don&apos;t need to be here.
              </p>
              <div className="mt-6">
                <Link href={'/vehicles'}>
                  <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AlreadyLoggedIn;
