import { Disclosure } from '@headlessui/react';
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

type NavbarProps = {
  hasQuickActionButton: boolean;
  quickActionLabel?: string;
  quickAction?: (state: boolean) => void;
};

const navigation: NavbarOption[] = [
  { name: 'Vehicles', href: '/vehicles' },
  { name: 'Fuel Cards', href: '/fuelCards' },
  { name: 'Toll Tags', href: '/tollTags' },
  { name: 'Depots', href: '/depots' },
];

const Navbar = ({
  hasQuickActionButton,
  quickActionLabel,
  quickAction,
}: NavbarProps) => {
  const router = useRouter();

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
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <MobileMenuButton open={open} />
                </div>
                <NavbarLogo />
                <NavbarOptions navigation={navigation} />
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {hasQuickActionButton &&
                    quickAction != null &&
                    quickActionLabel != null && (
                      <QuickActionButton
                        label={quickActionLabel}
                        onClick={quickAction}
                      />
                    )}
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <NotificationButton />
                  <ProfileDropdown userNavigation={userNavigation} />
                </div>
              </div>
            </div>
          </div>

          <MobileNavbarOptions
            navigation={navigation}
            userNavigation={userNavigation}
          />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
