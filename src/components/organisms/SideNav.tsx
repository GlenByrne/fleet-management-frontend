import { Dialog, Transition } from '@headlessui/react';
import {
  CreditCardIcon,
  ExclamationIcon,
  HomeIcon,
  OfficeBuildingIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { NavbarOption } from '@/constants/types';
import Logo from '@/components/atoms/Logo';
import CloseSideNavButton from '@/components/atoms/CloseSideNavButton';
import NarrowSideNavigationLink from '@/components/atoms/NarrowSideNavigationLink';
import SideNavigationLinks from '@/components/atoms/SideNavigationLinks';

type SideNavProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
};

const SideNav = ({ mobileMenuOpen, setMobileMenuOpen }: SideNavProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

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

  return (
    <>
      {/* Narrow sidebar */}
      <div className="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
        <div className="flex w-full flex-col items-center py-6">
          <div className="flex shrink-0 items-center">
            <Logo />
          </div>
          <div className="mt-6 w-full flex-1 space-y-1 px-2">
            {navigation.map((link) => (
              <NarrowSideNavigationLink key={link.name} link={link} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <CloseSideNavButton
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </div>
                </Transition.Child>
                <div className="flex shrink-0 items-center px-4">
                  <Logo />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="flex h-full flex-col">
                    <div className="space-y-1">
                      {navigation.map((link) => (
                        <SideNavigationLinks key={link.name} link={link} />
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SideNav;
