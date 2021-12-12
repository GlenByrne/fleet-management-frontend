import { UserNavbarOption } from '@/constants/types';
import classNames from '@/utilities/classNames';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Fragment,
  Dispatch,
  SetStateAction,
  ReactNode,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';

type ContentAreaProps = {
  children: ReactNode;
  userNavigation: UserNavbarOption[];
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  hasQuickActionButton: boolean;
  quickAction?: (state: boolean) => void;
  quickActionLabel?: string;
  pageSearchable: boolean;
  searchSubmitHandler?: FormEventHandler<Element>;
  setSearchCriteria?: ChangeEventHandler<HTMLInputElement>;
};

const ContentArea = ({
  children,
  userNavigation,
  setMobileMenuOpen,
  hasQuickActionButton,
  quickAction,
  quickActionLabel,
}: ContentAreaProps) => {
  return (
    // <div className="flex-1 flex flex-col overflow-hidden">
    //   <header className="w-full">
    //     <div className="relative z-10 shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
    //       <div className="flex-1 flex justify-between px-4 sm:px-6">
    //         <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
    //           <div className="shrink-0 flex items-center">
    //             <a href="#">
    //               <img
    //                 className="block h-8 w-auto"
    //                 src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
    //                 alt="Workflow"
    //               />
    //             </a>
    //           </div>
    //         </div>

    //         <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
    //           {/* Profile dropdown */}
    //           <Menu as="div" className="relative shrink-0">
    //             <div>
    //               <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    //                 <span className="sr-only">Open user menu</span>
    //                 <img
    //                   className="h-8 w-8 rounded-full"
    //                   src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
    //                   alt=""
    //                 />
    //               </Menu.Button>
    //             </div>
    //             <Transition
    //               as={Fragment}
    //               enter="transition ease-out duration-100"
    //               enterFrom="transform opacity-0 scale-95"
    //               enterTo="transform opacity-100 scale-100"
    //               leave="transition ease-in duration-75"
    //               leaveFrom="transform opacity-100 scale-100"
    //               leaveTo="transform opacity-0 scale-95"
    //             >
    //               <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                 {userNavigation.map((item) => (
    //                   <Menu.Item key={item.name}>
    //                     {({ active }) => (
    //                       <a
    //                         className={classNames(
    //                           active ? 'bg-gray-100' : '',
    //                           'block px-4 py-2 text-sm text-gray-700'
    //                         )}
    //                         onClick={item.onClick}
    //                       >
    //                         {item.name}
    //                       </a>
    //                     )}
    //                   </Menu.Item>
    //                 ))}
    //               </Menu.Items>
    //             </Transition>
    //           </Menu>

    //           {hasQuickActionButton &&
    //             quickAction != null &&
    //             quickActionLabel != null && (
    //               <button
    //                 type="button"
    //                 className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //                 onClick={() => quickAction(true)}
    //               >
    //                 <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
    //                 <span className="sr-only">{quickActionLabel}</span>
    //               </button>
    //             )}
    //         </div>
    //       </div>
    //     </div>
    //   </header>

    //   {/* Main content */}
    //   <div className="flex-1 flex items-stretch overflow-hidden p-4">
    //     <main className="flex-1 overflow-y-auto">
    //       {/* Primary column */}
    //       <section
    //         aria-labelledby="primary-heading"
    //         className="min-w-0 flex-1 h-full flex flex-col lg:order-last"
    //       >
    //         <h1 id="primary-heading" className="sr-only">
    //           Dashboard
    //         </h1>
    //         {children}
    //       </section>
    //     </main>
    //   </div>
    // </div>

    <>
      {/* Background color split screen for large screens */}
      <div
        className="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
        <Disclosure as="nav" className="shrink-0 bg-indigo-600">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  {/* Logo section */}
                  <div className="flex items-center px-2 lg:px-0 xl:w-64">
                    <div className="shrink-0">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                    </div>
                  </div>

                  {/* Links section */}
                  <div className="lg:block lg:w-80">
                    <div className="flex items-center justify-end">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-4 relative shrink-0">
                        <div>
                          <Menu.Button className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={item.onClick}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-800"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                  >
                    Support
                  </Disclosure.Button>
                </div>
                <div className="pt-4 pb-3 border-t border-indigo-800">
                  <div className="px-2">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* 3 column wrapper */}
        <div className="grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-full" style={{ minHeight: '36rem' }}>
                  <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg">
                    {children}
                  </div>
                </div>
                {/* End main area */}
              </div>
            </div>
            <div className="border-b border-gray-200 xl:border-b-0 xl:shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
              <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                {/* Start left column area */}
                <div className="h-full relative" style={{ minHeight: '12rem' }}>
                  <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg" />
                </div>
                {/* End left column area */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentArea;
