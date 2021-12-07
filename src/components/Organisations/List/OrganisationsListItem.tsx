import { UsersOnOrganisations } from '@/generated/graphql';
import Link from 'next/link';

type OrganisationsListItemProps = {
  organisation: UsersOnOrganisations;
};

const OrganisationsListItem = ({
  organisation,
}: OrganisationsListItemProps) => {
  return (
    <li>
      <Link
        href={`/${encodeURIComponent(organisation.organisation.id)}/dashboard`}
      >
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between"></div>
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
};

export default OrganisationsListItem;
