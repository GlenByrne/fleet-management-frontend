import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import {
  useGetUsersOrganisationsQuery,
  useGetUsersOrganisationsInvitesQuery,
} from '@/generated/graphql';
import React, { useState } from 'react';
import OrganisationTemplate from 'src/templates/OrganisationTemplate';
import CreateOrganisationModal from './addOrganisation/CreateOrganisationModal';
import OrganisationList from './organisationList/OrganisationList';
import OrganisationInviteList from './organistationInviteList/OrganisationInviteList';

const OrganisationPage = () => {
  const [organistionsList] = useGetUsersOrganisationsQuery();
  const [organisationInvites] = useGetUsersOrganisationsInvitesQuery();
  const [addOrganisationModalState, setAddOrganisationModalState] =
    useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          organisationList={organistionsList}
          changeAddOrganisationModalState={changeAddOrganisationModalState}
        />
      }
      rightColumn={<OrganisationInviteList invites={organisationInvites} />}
    />
  );
};

export default OrganisationPage;
