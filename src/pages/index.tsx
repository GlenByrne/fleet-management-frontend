import OrganisationInviteList from '@/components/Organisations/List/OrganisationInviteList';
import OrganisationsList from '@/components/Organisations/List/OrganisationsList';
import CreateOrganisationModal from '@/components/Organisations/Modal/Create/CreateOrganisationModal';
import OrganisationsMenuLayout from '@/core/Layout/OrganisationsMenuLayout/OrganisationsMenuLayout';
import { NextPage } from 'next';

const Organisations: NextPage = () => {
  return (
    <OrganisationsMenuLayout
      mainContent={<OrganisationsList />}
      rightContent={<OrganisationInviteList />}
    >
      <CreateOrganisationModal />
    </OrganisationsMenuLayout>
  );
};

export default Organisations;
