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
import Logo from '@/components/Atomic/atoms/Logo';
import CloseSideNavButton from '@/components/Atomic/atoms/CloseSideNavButton';
import NarrowSideNavigationLink from '@/components/Atomic/atoms/NarrowSideNavigationLink';
import SideNavigationLinks from '@/components/Atomic/atoms/SideNavigationLinks';

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
      <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="shrink-0 flex items-center">
            <Logo />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
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
              <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
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
                <div className="shrink-0 px-4 flex items-center">
                  <Logo />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {navigation.map((link) => (
                        <SideNavigationLinks key={link.name} link={link} />
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SideNav;
