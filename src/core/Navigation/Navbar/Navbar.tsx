import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { NavbarOption, UserNavbarOption } from '../../../constants/types';
import ProfileDropdown from './ProfileDropdown';
import NotificationButton from './NotificationButton';
import MobileNavbarOptions from './MobileNavbarOptions';
import MobileMenuButton from './MobileMenuButton';
import NavbarLogo from './NavbarLogo';
import NavbarOptions from './NavbarOptions';
import QuickActionButton from './QuickActionButton';
import client from 'constants/apollo-client';
import { useRouter } from 'next/router';
import {
  BellIcon,
  CreditCardIcon,
  HomeIcon,
  MenuAlt2Icon,
  MenuIcon,
  OfficeBuildingIcon,
  PlusSmIcon,
  SearchIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import classNames from 'utilities/classNames';

type NavbarProps = {
  hasQuickActionButton: boolean;
  quickActionLabel?: string;
  quickAction?: (state: boolean) => void;
};

const navigation: NavbarOption[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Vehicles', href: '/vehicles', icon: TruckIcon },
  { name: 'Fuel Cards', href: '/fuelCards', icon: CreditCardIcon },
  { name: 'Toll Tags', href: '/tollTags', icon: TagIcon },
  { name: 'Depots', href: '/depots', icon: OfficeBuildingIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
];

const Navbar = ({
  hasQuickActionButton,
  quickActionLabel,
  quickAction,
}: NavbarProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userNavigation: UserNavbarOption[] = [
    { name: 'Your Profile', href: '#', onClick: () => {} },
    { name: 'Settings', href: '#', onClick: () => {} },
    {
      name: 'Sign out',
      onClick: () => {
        localStorage.removeItem('token');
        router.push('/login');
        client.clearStore();
      },
    },
  ];

  return (
    // <Disclosure as="nav" className="bg-gray-800">
    //   {({ open }) => (
    //     <>
    //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //         <div className="flex justify-between h-16">
    //           <div className="flex">
    //             <div className="-ml-2 mr-2 flex items-center md:hidden">
    //               <MobileMenuButton open={open} />
    //             </div>
    //             <NavbarLogo />
    //             <NavbarOptions navigation={navigation} />
    //           </div>
    //           <div className="flex items-center">
    //             <div className="flex-shrink-0">
    //               {hasQuickActionButton &&
    //                 quickAction != null &&
    //                 quickActionLabel != null && (
    //                   <QuickActionButton
    //                     label={quickActionLabel}
    //                     onClick={quickAction}
    //                   />
    //                 )}
    //             </div>
    //             <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
    //               <NotificationButton />
    //               <ProfileDropdown userNavigation={userNavigation} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <MobileNavbarOptions
    //         navigation={navigation}
    //         userNavigation={userNavigation}
    //       />
    //     </>
    //   )}
    // </Disclosure>

    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex">
        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 sm:px-6">
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search all files
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <SearchIcon
                          className="flex-shrink-0 h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        name="search-field"
                        id="search-field"
                        className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {hasQuickActionButton &&
                    quickAction != null &&
                    quickActionLabel != null && (
                      <button
                        type="button"
                        className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => quickAction(true)}
                      >
                        <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">{quickActionLabel}</span>
                      </button>
                    )}
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              {/* Primary column */}
              <section
                aria-labelledby="primary-heading"
                className="min-w-0 flex-1 h-full flex flex-col lg:order-last"
              >
                <h1 id="primary-heading" className="sr-only">
                  Photos
                </h1>
                {/* Your content */}
              </section>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block">
              {/* Your content */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
