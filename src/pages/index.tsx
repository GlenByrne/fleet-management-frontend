import { NextPage } from 'next';
import OrganisationsMenuLayout from 'core/Layout/OrganisationsMenuLayout/OrganisationsMenuLayout';
import { addOrganisationModalStateVar } from 'constants/apollo-client';
import OrganisationsList from 'components/Organisations/List/OrganisationsList';
import CreateOrganisationModal from 'components/Organisations/Modal/Create/CreateOrganisationModal';

const Organisations: NextPage = () => {
  return (
    <OrganisationsMenuLayout
      hasQuickActionButton={true}
      quickAction={addOrganisationModalStateVar}
      quickActionLabel="New Organisation"
      pageSearchable={false}
    >
      <CreateOrganisationModal />
      <OrganisationsList />
    </OrganisationsMenuLayout>
  );
};

export default Organisations;
