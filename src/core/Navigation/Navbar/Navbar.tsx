import { FC, Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { NavbarOption } from '../../../constants/types';
import ProfileDropdown from './ProfileDropdown';
import NotificationButton from './NotificationButton';
import MobileNavbarOptions from './MobileNavbarOptions';
import MobileMenuButton from './MobileMenuButton';
import NavbarLogo from './NavbarLogo';
import NavbarOptions from './NavbarOptions';

const navigation: NavbarOption[] = [
  { name: 'Vehicles', href: '/' },
  { name: 'Fuel Cards', href: '/fuelCards' },
  { name: 'Toll Tags', href: '/tollTags' },
];

const Navbar: FC = () => {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MobileMenuButton open={open} />
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <NavbarLogo />
                <NavbarOptions navigation={navigation} />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationButton />
                <ProfileDropdown />
              </div>
            </div>
          </div>
          <MobileNavbarOptions navigation={navigation} />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
