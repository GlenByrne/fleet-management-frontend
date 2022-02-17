import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import OrganisationInviteList from '@/components/organisms/Organisations/List/OrganisationInviteList';
import OrganisationsList from '@/components/organisms/Organisations/List/OrganisationsList';
import CreateOrganisationModal from '@/components/organisms/Organisations/Modal/Create/CreateOrganisationModal';
import OrganisationTemplate from '@/components/templates/OrganisationTemplate';
import {
  useGetUsersOrganisationsQuery,
  useGetUsersOrganisationsInvitesQuery,
  useRefreshAccessTokenMutation,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useState } from 'react';

const Organisations: NextPage = () => {
  const [usersOrganistions] = useGetUsersOrganisationsQuery();
  const [organisationInvites] = useGetUsersOrganisationsInvitesQuery();

  const [addOrganisationModalState, setAddOrganisationModalState] =
    useState(false);

  const changeAddOrganisationModalState = (newState: boolean) => {
    setAddOrganisationModalState(newState);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <OrganisationsList
          data={usersOrganistions.data}
          loading={usersOrganistions.fetching}
          error={usersOrganistions.error}
          changeAddOrganisationModalState={changeAddOrganisationModalState}
        />
      }
      rightColumn={
        <OrganisationInviteList
          data={organisationInvites.data}
          loading={organisationInvites.fetching}
          error={organisationInvites.error}
        />
      }
    />
  );
};

export default Organisations;
