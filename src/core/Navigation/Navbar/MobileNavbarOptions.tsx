import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';
import { NavbarOption } from '../../../constants/types';
import Link from 'next/link';
import MobileUserNavigation from './MobileUserNavigation';
import MobileNotificationButton from './MobileNotificationButton';

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

type MobileNavbarOptionsProps = {
  navigation: NavbarOption[];
  userNavigation: NavbarOption[];
};

const MobileNavbarOptions = ({
  navigation,
  userNavigation,
}: MobileNavbarOptionsProps) => {
  const router = useRouter();

  return (
    <Disclosure.Panel className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navigation.map((link, index) => (
          <Link key={index} href={link.href}>
            <a
              className={classNames(
                router.asPath === link.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block px-3 py-2 rounded-md text-base font-medium'
              )}
              aria-current={router.asPath === link.href ? 'page' : undefined}
            >
              {link.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5 sm:px-6">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-white">Test Name</div>
            <div className="text-sm font-medium text-gray-400">
              testemail@email.com
            </div>
          </div>

          {/* Mobile Notification*/}
          <MobileNotificationButton />
        </div>

        {/* Mobile user navigation */}
        <MobileUserNavigation userNavigation={userNavigation} />
      </div>
    </Disclosure.Panel>
  );
};

export default MobileNavbarOptions;
