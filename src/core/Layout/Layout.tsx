import { ReactNode, ChangeEventHandler, FormEventHandler } from 'react';
import Head from 'next/head';
import ClientOnly from 'core/ClientOnly/ClientOnly';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NavbarOption, UserNavbarOption } from 'constants/types';
import {
  CreditCardIcon,
  HomeIcon,
  OfficeBuildingIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import client from 'constants/apollo-client';
import SideNav from 'core/Layout/SideNav';
import ContentArea from './ContentArea';

type LayoutProps = {
  children: ReactNode;
  hasQuickActionButton: boolean;
  quickAction?: (state: boolean) => void;
  quickActionLabel?: string;
  pageSearchable: boolean;
  searchSubmitHandler?: FormEventHandler<Element>;
  setSearchCriteria?: ChangeEventHandler<HTMLInputElement>;
};

const navigation: NavbarOption[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Vehicles', href: '/vehicles', icon: TruckIcon },
  { name: 'Fuel Cards', href: '/fuelCards', icon: CreditCardIcon },
  { name: 'Toll Tags', href: '/tollTags', icon: TagIcon },
  { name: 'Depots', href: '/depots', icon: OfficeBuildingIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
];

const Layout = ({
  children,
  hasQuickActionButton,
  quickAction,
  quickActionLabel,
  pageSearchable,
  searchSubmitHandler,
  setSearchCriteria,
}: LayoutProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userNavigation: UserNavbarOption[] = [
    { name: 'Your Profile', onClick: () => {} },
    { name: 'Settings', onClick: () => {} },
    {
      name: 'Sign out',
      onClick: () => {
        localStorage.removeItem('token');
        router.push('/login');
        client.clearStore();
      },
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen">
      <Head>
        <title>Fleet Management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideNav
        navigation={navigation}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <ContentArea
        userNavigation={userNavigation}
        setMobileMenuOpen={setMobileMenuOpen}
        hasQuickActionButton={hasQuickActionButton}
        quickAction={quickAction}
        quickActionLabel={quickActionLabel}
        pageSearchable={pageSearchable}
        searchSubmitHandler={searchSubmitHandler}
        setSearchCriteria={setSearchCriteria}
      >
        <ClientOnly>{children}</ClientOnly>
      </ContentArea>
    </div>
  );
};

export default Layout;
