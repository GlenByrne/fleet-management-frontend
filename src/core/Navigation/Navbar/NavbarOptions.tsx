import { NavbarOption } from '@/constants/types';
import classNames from '@/utilities/classNames';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavbarOptionsProps = {
  navigation: NavbarOption[];
};

const NavbarOptions = ({ navigation }: NavbarOptionsProps) => {
  const router = useRouter();

  return (
    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
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
  );
};

export default NavbarOptions;
