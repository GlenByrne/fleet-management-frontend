import { Menu } from '@headlessui/react';
import { UserNavbarOption } from '@/constants/types';
import classNames from '@/utilities/classNames';

type ProfileDropdownMenuItemProps = {
  item: UserNavbarOption;
};

function ProfileDropdownMenuItem({ item }: ProfileDropdownMenuItemProps) {
  return (
    <Menu.Item>
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
  );
}

export default ProfileDropdownMenuItem;
