import { UserNavbarOption } from '@/constants/types';
import { Disclosure } from '@headlessui/react';

type MobileUserNavigationProps = {
  userNavigation: UserNavbarOption[];
};

const MobileUserNavigation = ({
  userNavigation,
}: MobileUserNavigationProps) => {
  return (
    <div className="mt-3 px-2 space-y-1 sm:px-3">
      {userNavigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          onClick={item.onClick}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
};

export default MobileUserNavigation;
