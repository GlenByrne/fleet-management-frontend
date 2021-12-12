import OrganisationInviteList from '@/components/Organisations/List/OrganisationInviteList';
import OrganisationsList from '@/components/Organisations/List/OrganisationsList';
import CreateOrganisationModal from '@/components/Organisations/Modal/Create/CreateOrganisationModal';
import OrganisationsMenuLayout from '@/core/Layout/OrganisationsMenuLayout/OrganisationsMenuLayout';
import { NextPage } from 'next';
import { useState } from 'react';

const Organisations: NextPage = () => {
  const [addOrganisationModalState, setAddOrganisationModalState] =
    useState(false);

  const changeAddOrganisationModalState = (newState: boolean) => {
    setAddOrganisationModalState(newState);
  };

  return (
    <OrganisationsMenuLayout
      mainContent={
        <OrganisationsList
          changeAddOrganisationModalState={changeAddOrganisationModalState}
        />
      }
      rightContent={<OrganisationInviteList />}
    >
      <CreateOrganisationModal
        modalState={addOrganisationModalState}
        changeModalState={setAddOrganisationModalState}
      />
    </OrganisationsMenuLayout>
  );
};

export default Organisations;
