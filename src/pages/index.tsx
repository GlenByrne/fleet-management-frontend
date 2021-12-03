import { NextPage } from 'next';
import OrganisationsMenuLayout from 'core/Layout/OrganisationsMenuLayout/OrganisationsMenuLayout';
import { addOrganisationModalStateVar } from 'constants/apollo-client';
import OrganisationsList from 'components/Organisations/List/OrganisationsList';
import CreateOrganisationModal from 'components/Organisations/Modal/Create/CreateOrganisationModal';
import OrganisationInviteList from 'components/Organisations/List/OrganisationInviteList';

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
