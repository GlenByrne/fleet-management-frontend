import SideNav from '@/components/Atomic/organisms/SideNav';
import InfringementList from '@/components/Atomic/organisms/Infringements/List/InfringementList';
import CreateInfringementModal from '@/components/Atomic/organisms/Infringements/Modal/Create/CreateInfringementModal';
import DeleteInfringementModal from '@/components/Atomic/organisms/Infringements/Modal/Delete/DeleteInfringementModal';
import UpdateInfringementModal from '@/components/Atomic/organisms/Infringements/Modal/Update/UpdateInfringementModal';
import InfringementTemplate from '@/components/Atomic/templates/InfringementTemplate';
import {
  Infringement,
  GetInfringementsQuery,
  UpdateInfringementInput,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import HeaderWithQuickActionNoSearchBar from '@/components/Atomic/organisms/HeaderWithQuickActionNoSearchBar';
import UpdateInfringementStatusModal from '@/components/Atomic/organisms/Infringements/Modal/Update/UpdateInfringementStatusModal';

type InfringementsProps = {
  data: GetInfringementsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentInfringement: UpdateInfringementInput;
  changeCurrentInfringement: (tollTag: Infringement) => void;
  addInfringementModalState: boolean;
  updateInfringementModalState: boolean;
  updateInfringementStatusModalState: boolean;
  deleteInfringementModalState: boolean;
  changeAddInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementStatusModalState: (newState: boolean) => void;
  changeDeleteInfringementModalState: (newState: boolean) => void;
};

const InfringementsPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
  quickAction,
  quickActionLabel,
  currentInfringement,
  changeCurrentInfringement,
  addInfringementModalState,
  updateInfringementModalState,
  updateInfringementStatusModalState,
  deleteInfringementModalState,
  changeAddInfringementModalState,
  changeUpdateInfringementModalState,
  changeUpdateInfringementStatusModalState,
  changeDeleteInfringementModalState,
}: InfringementsProps) => {
  return (
    <InfringementTemplate
      header={
        <HeaderWithQuickActionNoSearchBar
          setMobileMenuOpen={setMobileMenuOpen}
          quickAction={quickAction}
          quickActionLabel={quickActionLabel}
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      }
      content={
        <>
          <CreateInfringementModal
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
            data={data}
            loading={loading}
            error={error}
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

export default InfringementsPage;
