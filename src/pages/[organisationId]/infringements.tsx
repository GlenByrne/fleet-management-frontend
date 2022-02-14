import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import InfringementList from '@/components/organisms/Infringements/List/InfringementList';
import CreateInfringementModal from '@/components/organisms/Infringements/Modal/Create/CreateInfringementModal';
import DeleteInfringementModal from '@/components/organisms/Infringements/Modal/Delete/DeleteInfringementModal';
import UpdateInfringementModal from '@/components/organisms/Infringements/Modal/Update/UpdateInfringementModal';
import UpdateInfringementStatusModal from '@/components/organisms/Infringements/Modal/Update/UpdateInfringementStatusModal';
import SideNav from '@/components/organisms/SideNav';
import InfringementTemplate from '@/components/templates/InfringementTemplate';
import {
  Infringement,
  InfringementStatus,
  UpdateInfringementInput,
  useGetDriversQuery,
  useGetInfringementsQuery,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Infringements: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const infringements = useGetInfringementsQuery({
    variables: {
      first: 10,
    },
  });
  const drivers = useGetDriversQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const [addInfringementModalState, setAddInfringementModalState] =
    useState(false);
  const [updateInfringementModalState, setUpdateInfringementModalState] =
    useState(false);
  const [
    updateInfringementStatusModalState,
    setUpdateInfringementStatusModalState,
  ] = useState(false);
  const [deleteInfringementModalState, setDeleteInfringementModalState] =
    useState(false);

  const [currentInfringement, setCurrentInfringement] =
    useState<UpdateInfringementInput>({
      id: '',
      description: '',
      dateOccured: new Date(),
      status: InfringementStatus.Unsigned,
    });

  const changeAddInfringementModalState = (newState: boolean) => {
    setAddInfringementModalState(newState);
  };

  const changeUpdateInfringementModalState = (newState: boolean) => {
    setUpdateInfringementModalState(newState);
  };

  const changeUpdateInfringementStatusModalState = (newState: boolean) => {
    setUpdateInfringementStatusModalState(newState);
  };

  const changeDeleteInfringementModalState = (newState: boolean) => {
    setDeleteInfringementModalState(newState);
  };

  const changeCurrentInfringement = (infringement: Infringement) => {
    const chosenInfringement: UpdateInfringementInput = {
      id: infringement.id,
      description: infringement.description,
      dateOccured: infringement.dateOccured,
      status: infringement.status,
    };
    setCurrentInfringement(chosenInfringement);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <InfringementTemplate
      header={
        <HeaderWithQuickActionNoSearchBar
          setMobileMenuOpen={changeMobileMenuOpenState}
          quickAction={changeAddInfringementModalState}
          quickActionLabel="New Infringement"
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={changeMobileMenuOpenState}
        />
      }
      content={
        <>
          <CreateInfringementModal
            drivers={drivers}
            modalState={addInfringementModalState}
            changeModalState={changeAddInfringementModalState}
          />
          <UpdateInfringementModal
            currentInfringement={currentInfringement}
            modalState={updateInfringementModalState}
            changeModalState={changeUpdateInfringementModalState}
          />
          <UpdateInfringementStatusModal
            currentInfringement={currentInfringement}
            modalState={updateInfringementStatusModalState}
            changeModalState={changeUpdateInfringementStatusModalState}
          />
          <DeleteInfringementModal
            currentInfringement={currentInfringement}
            modalState={deleteInfringementModalState}
            changeModalState={changeDeleteInfringementModalState}
          />
          <InfringementList
            data={infringements.data}
            loading={infringements.loading}
            error={infringements.error}
            changeAddInfringementModalState={changeAddInfringementModalState}
            changeDeleteInfringementModalState={
              changeDeleteInfringementModalState
            }
            changeUpdateInfringementModalState={
              changeUpdateInfringementModalState
            }
            changeUpdateInfringementStatusModalState={
              changeUpdateInfringementStatusModalState
            }
            changeCurrentInfringement={changeCurrentInfringement}
          />
        </>
      }
    />
  );
};

export default Infringements;
