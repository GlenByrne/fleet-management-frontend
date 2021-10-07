import { FC } from 'react';
import { NavbarOption } from '../../../lib/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

type NavbarOptionsProps = {
  navigation: NavbarOption[];
};

const NavbarOptions: FC<NavbarOptionsProps> = ({ navigation }) => {
  const router = useRouter();

  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        {navigation.map((link, index) => {
          return (
            <Link key={index} href={link.href}>
              <a
                className={classNames(
                  router.asPath === link.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium'
                )}
                aria-current={router.asPath === link.href ? 'page' : undefined}
              >
                {link.name}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarOptions;
