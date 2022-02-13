import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import OrganisationInviteList from '@/components/organisms/Organisations/List/OrganisationInviteList';
import OrganisationsList from '@/components/organisms/Organisations/List/OrganisationsList';
import CreateOrganisationModal from '@/components/organisms/Organisations/Modal/Create/CreateOrganisationModal';
import OrganisationTemplate from '@/components/templates/OrganisationTemplate';
import {
  useGetUsersOrganisationsQuery,
  useGetUsersOrganisationsInvitesQuery,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useState } from 'react';

const Organisations: NextPage = () => {
  const {
    data: organisationsData,
    loading: organisationsLoading,
    error: organisationsError,
  } = useGetUsersOrganisationsQuery();
  const {
    data: invitesData,
    loading: invitesLoading,
    error: invitesError,
  } = useGetUsersOrganisationsInvitesQuery();

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
          data={organisationsData}
          loading={organisationsLoading}
          error={organisationsError}
          changeAddOrganisationModalState={changeAddOrganisationModalState}
        />
      }
      rightColumn={
        <OrganisationInviteList
          data={invitesData}
          loading={invitesLoading}
          error={invitesError}
        />
      }
    />
  );
};

export default Organisations;
