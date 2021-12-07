import { ReactNode, ChangeEventHandler, FormEventHandler } from 'react';
import Head from 'next/head';
import ClientOnly from 'core/ClientOnly/ClientOnly';
import { useEffect } from 'react';
import { NavbarOption, UserNavbarOption } from 'constants/types';
import {
  CreditCardIcon,
  ExclamationIcon,
  HomeIcon,
  OfficeBuildingIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import ContentArea from './ContentArea';
import { checkAuth, LogOut } from 'utilities/auth';
import client, {
  accessTokenVar,
  loggedInUserVar,
  successAlertStateVar,
  successTextVar,
} from 'constants/apollo-client';
import { useRouter } from 'next/router';
import { useLogoutMutation } from 'generated/graphql';
import SideNav from './SideNav';

type MainLayoutProps = {
  children: ReactNode;
  hasQuickActionButton: boolean;
  quickAction?: (state: boolean) => void;
  quickActionLabel?: string;
  pageSearchable: boolean;
  searchSubmitHandler?: FormEventHandler<Element>;
  setSearchCriteria?: ChangeEventHandler<HTMLInputElement>;
};

const MainLayout = ({
  children,
  hasQuickActionButton,
  quickAction,
  quickActionLabel,
  pageSearchable,
  searchSubmitHandler,
  setSearchCriteria,
}: MainLayoutProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logOut] = useLogoutMutation();

  const handleLogOut = () => {
    logOut();
    accessTokenVar(null);
    loggedInUserVar(null);
    router.push('/login');
    client.clearStore();
    successTextVar('Logged out successfully');
    successAlertStateVar(true);
  };

  const navigation: NavbarOption[] = [
    {
      name: 'Home',
      href: `/${encodeURIComponent(organisationId)}/dashboard`,
      icon: HomeIcon,
    },
    {
      name: 'Vehicles',
      href: `/${encodeURIComponent(organisationId)}/vehicles`,
      icon: TruckIcon,
    },
    {
      name: 'Infringements',
      href: `/${encodeURIComponent(organisationId)}/infringements`,
      icon: ExclamationIcon,
    },
    {
      name: 'Fuel Cards',
      href: `/${encodeURIComponent(organisationId)}/fuelCards`,
      icon: CreditCardIcon,
    },
    {
      name: 'Toll Tags',
      href: `/${encodeURIComponent(organisationId)}/tollTags`,
      icon: TagIcon,
    },
    {
      name: 'Depots',
      href: `/${encodeURIComponent(organisationId)}/depots`,
      icon: OfficeBuildingIcon,
    },
    {
      name: 'Users',
      href: `/${encodeURIComponent(organisationId)}/users`,
      icon: UsersIcon,
    },
  ];

  const userNavigation: UserNavbarOption[] = [
    { name: 'Your Profile', onClick: () => {} },
    { name: 'Settings', onClick: () => {}, href: '/settings/account' },
    {
      name: 'Sign out',
      onClick: handleLogOut,
    },
  ];

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

export default MainLayout;
