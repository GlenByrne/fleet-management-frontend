import {
  GetUsersOrganisationsQuery,
  Organisation,
  UsersOnOrganisations,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { FormEvent, FormEventHandler } from 'react';
import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import OrganisationTemplate from '@/components/templates/OrganisationTemplate';
import CreateOrganisationModal from '@/components/organisms/Organisations/Modal/Create/CreateOrganisationModal';
import OrganisationsList from '@/components/organisms/Organisations/List/OrganisationsList';
import OrganisationInviteList from '@/components/organisms/Organisations/List/OrganisationInviteList';

type OrganisationsProps = {
  organisationsData: GetUsersOrganisationsQuery | undefined;
  organisationsLoading: boolean;
  organisationsError: ApolloError | undefined;
  invitesData: GetUsersOrganisationsQuery | undefined;
  invitesLoading: boolean;
  invitesError: ApolloError | undefined;
  setMobileMenuOpen: (newState: boolean) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  addOrganisationModalState: boolean;
  changeAddOrganisationModalState: (newState: boolean) => void;
};

const OrganisationsPage = ({
  organisationsData,
  organisationsLoading,
  organisationsError,
  invitesData,
  invitesLoading,
  invitesError,
  setMobileMenuOpen,
  quickAction,
  quickActionLabel,
  addOrganisationModalState,
  changeAddOrganisationModalState,
}: OrganisationsProps) => {
  return (
    <OrganisationTemplate
      header={
        <HeaderWithQuickActionNoSearchBar
          setMobileMenuOpen={setMobileMenuOpen}
          quickAction={quickAction}
          quickActionLabel={quickActionLabel}
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

export default OrganisationsPage;
