import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import classNames from '@/utilities/classNames';

const navigation = [
  {
    name: 'Account',
    href: '/settings/account',
    icon: UserCircleIcon,
    current: true,
  },
  {
    name: 'Password',
    href: '/settings/password',
    icon: KeyIcon,
    current: false,
  },
  { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: false },
];

type PasswordSettingsTemplateProps = {
  children: ReactNode;
};

function PasswordSettingsTemplate({ children }: PasswordSettingsTemplateProps) {
  const router = useRouter();

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <a
                className={classNames(
                  router.asPath === item.href
                    ? 'bg-gray-50 text-indigo-700 hover:bg-white hover:text-indigo-700'
                    : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={router.asPath === item.href ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    router.asPath === item.href
                      ? 'text-indigo-500 group-hover:text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-1 mr-3 h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">{children}</div>
    </div>
  );
}

export default PasswordSettingsTemplate;
