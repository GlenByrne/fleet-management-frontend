import React, { useState } from 'react';
import OrganisationTemplate from 'src/templates/OrganisationTemplate';
import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import CreateOrganisationModal from './addOrganisation/CreateOrganisationModal';
import OrganisationList from './organisationList/OrganisationList';
import OrganisationInviteList from './organistationInviteList/OrganisationInviteList';

function OrganisationPage() {
  const [addOrganisationModalState, setAddOrganisationModalState] =
    useState(false);
  const [, setMobileMenuOpen] = useState(false);

  const changeAddOrganisationModalState = (newState: boolean) => {
    setAddOrganisationModalState(newState);
  };

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <OrganisationTemplate
      header={
        <HeaderWithQuickActionNoSearchBar
          setMobileMenuOpen={changeMobileMenuOpenState}
          quickAction={changeAddOrganisationModalState}
          quickActionLabel="Add Organisation"
        />
      }
      createModal={
        <CreateOrganisationModal
          modalState={addOrganisationModalState}
          changeModalState={changeAddOrganisationModalState}
        />
      }
      leftColumn={
        <OrganisationList
          changeAddOrganisationModalState={changeAddOrganisationModalState}
        />
      }
      rightColumn={<OrganisationInviteList />}
    />
  );
}

export default OrganisationPage;
