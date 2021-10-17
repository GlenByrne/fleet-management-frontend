import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { NavbarOption } from '../../../constants/types';
import Link from 'next/link';

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

type MobileNavbarOptionsProps = {
  navigation: NavbarOption[];
};

const MobileNavbarOptions = ({ navigation }: MobileNavbarOptionsProps) => {
  const router = useRouter();

  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
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
    </Disclosure.Panel>
  );
};

export default MobileNavbarOptions;
