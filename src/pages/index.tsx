import OrganisationsPage from '@/components/pages/organisations';
import {
  useGetUsersOrganisationsInvitesQuery,
  useGetUsersOrganisationsQuery,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useState } from 'react';

const Organisations: NextPage = () => {
  const {
    data: organisationData,
    loading: organisationLoading,
    error: organisationError,
  } = useGetUsersOrganisationsQuery();
  const {
    data: inviteData,
    loading: inviteLoading,
    error: inviteError,
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
    <OrganisationsPage
      organisationsData={organisationData}
      organisationsLoading={organisationLoading}
      organisationsError={organisationError}
      invitesData={inviteData}
      invitesLoading={inviteLoading}
      invitesError={inviteError}
      addOrganisationModalState={addOrganisationModalState}
      changeAddOrganisationModalState={changeAddOrganisationModalState}
      setMobileMenuOpen={changeMobileMenuOpenState}
      quickAction={changeAddOrganisationModalState}
      quickActionLabel={'Add Organisation'}
    />
  );
};

export default Organisations;
