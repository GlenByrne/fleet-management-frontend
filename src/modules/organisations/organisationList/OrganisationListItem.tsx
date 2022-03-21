import Link from 'next/link';
import React from 'react';
import { UsersOnOrganisations } from '@/generated/graphql';

type OrganisationListItemProps = {
  organisation: UsersOnOrganisations;
};

function OrganisationListItem({ organisation }: OrganisationListItemProps) {
  return (
    <li key={organisation.organisation.id}>
      <Link
        href={`/${encodeURIComponent(organisation.organisation.id)}/dashboard`}
      >
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between" />
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  {organisation.organisation.name}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  {organisation.role}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default OrganisationListItem;
