import CirclularAddButton from '@/components/atoms/CirclularAddButton';
import MobileMenuHamburgerButton from '@/components/atoms/MobileMenuHamburgerButton';
import ProfileDropdownMenuItem from '@/components/atoms/ProfileDropdownMenuItem';
import ProfileIconButton from '@/components/atoms/ProfileIconButton';
import SearchBar from '@/components/molecules/SearchBar';
import client, {
  accessTokenVar,
  loggedInUserVar,
  successAlertStateVar,
  successTextVar,
} from 'src/apollo/apollo-client';
import { UserNavbarOption } from '@/constants/types';
import { useLogoutMutation } from '@/generated/graphql';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, Fragment } from 'react';

type HeaderWithSearchbarAndQuickActionButtonProps = {
  setMobileMenuOpen: (newState: boolean) => void;
  searchSubmitHandler: FormEventHandler<Element>;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
};

const HeaderWithSearchBarAndQuickActionButton = ({
  setMobileMenuOpen,
  searchSubmitHandler,
  changeSearchCriteria,
  quickAction,
  quickActionLabel,
}: HeaderWithSearchbarAndQuickActionButtonProps) => {
  const router = useRouter();
  const [logOut] = useLogoutMutation();

  const handleLogOut = () => {
    logOut();
    accessTokenVar(null);
    loggedInUserVar(null);
    router.push('/login');
    client.clearStore();
    successTextVar('Logged out successfully');
    successAlertStateVar(true);
  };

  const userNavigation: UserNavbarOption[] = [
    { name: 'Your Profile', onClick: () => {} },
    { name: 'Settings', onClick: () => {}, href: '/settings/account' },
    {
      name: 'Sign out',
      onClick: handleLogOut,
    },
  ];

  return (
    <header className="w-full">
      <div className="relative z-10 shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <MobileMenuHamburgerButton setMobileMenuOpen={setMobileMenuOpen} />
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex">
            <SearchBar
              onSubmit={searchSubmitHandler}
              changeSearchCriteria={changeSearchCriteria}
            />
          </div>

          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative shrink-0">
              <ProfileIconButton src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" />
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
                    <ProfileDropdownMenuItem key={item.name} item={item} />
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <CirclularAddButton
              onClick={() => quickAction(true)}
              label={quickActionLabel}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderWithSearchBarAndQuickActionButton;