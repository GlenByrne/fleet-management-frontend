import MobileMenuHamburgerButton from '@/components/Atomic/atoms/MobileMenuHamburgerButton';
import ProfileDropdownMenuItem from '@/components/Atomic/atoms/ProfileDropdownMenuItem';
import ProfileIconButton from '@/components/Atomic/atoms/ProfileIconButton';
import { UserNavbarOption } from '@/constants/types';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type HeaderNoSearchbarOrQuickActionButtonProps = {
  setMobileMenuOpen: (newState: boolean) => void;
  userNavigation: UserNavbarOption[];
};

const HeaderNoSearchBarOrQuickAction = ({
  setMobileMenuOpen,
  userNavigation,
}: HeaderNoSearchbarOrQuickActionButtonProps) => {
  return (
    <header className="w-full">
      <div className="relative z-10 shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <MobileMenuHamburgerButton setMobileMenuOpen={setMobileMenuOpen} />
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex"></div>

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
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNoSearchBarOrQuickAction;
