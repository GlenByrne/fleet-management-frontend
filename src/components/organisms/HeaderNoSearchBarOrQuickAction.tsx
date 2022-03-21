import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import MobileMenuHamburgerButton from '@/components/atoms/MobileMenuHamburgerButton';
import ProfileDropdownMenuItem from '@/components/atoms/ProfileDropdownMenuItem';
import ProfileIconButton from '@/components/atoms/Button/ProfileIconButton';
import { UserNavbarOption } from '@/constants/types';
import { useLogoutMutation } from '@/generated/graphql';
import { setAccessToken, setIsLoggedIn } from '@/pages/_app';

type HeaderNoSearchbarOrQuickActionButtonProps = {
  setMobileMenuOpen: (newState: boolean) => void;
};

function HeaderNoSearchBarOrQuickAction({
  setMobileMenuOpen,
}: HeaderNoSearchbarOrQuickActionButtonProps) {
  const router = useRouter();
  const [logOut] = useLogoutMutation();

  const handleLogOut = () => {
    logOut();
    setAccessToken(null);
    setIsLoggedIn(false);
    router.push('/login');
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
      <div className="relative z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <MobileMenuHamburgerButton setMobileMenuOpen={setMobileMenuOpen} />
        <div className="flex flex-1 justify-between px-4 sm:px-6">
          <div className="flex flex-1" />

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
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <ProfileDropdownMenuItem key={item.name} item={item} />
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderNoSearchBarOrQuickAction;
