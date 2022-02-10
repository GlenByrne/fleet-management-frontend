import { NavbarOption } from '@/constants/types';
import classNames from '@/utilities/classNames';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NarrowSideNavigationLinkProps = {
  link: NavbarOption;
};

const NarrowSideNavigationLink = ({ link }: NarrowSideNavigationLinkProps) => {
  const router = useRouter();

  return (
    <Link key={link.name} href={link.href}>
      <a
        className={classNames(
          router.asPath === link.href
            ? 'bg-indigo-800 text-white'
            : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
          'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
        )}
        aria-current={router.asPath === link.href ? 'page' : undefined}
      >
        <link.icon
          className={classNames(
            router.asPath === link.href
              ? 'text-white'
              : 'text-indigo-300 group-hover:text-white',
            'h-6 w-6'
          )}
          aria-hidden="true"
        />
        <span className="mt-2">{link.name}</span>
      </a>
    </Link>
  );
};

export default NarrowSideNavigationLink;
