import SideNav from '@/components/organisms/SideNav';
import { Defect, GetVehicleDefectsQuery } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import DefectTemplate from '@/components/templates/DefectTemplate';
import CreateDefectModal from '@/components/organisms/Defects/Modal/Create/CreateDefectModal';
import UpdateDefectModal from '@/components/organisms/Defects/Modal/Update/UpdateDefectModal';
import DeleteDefectModal from '@/components/organisms/Defects/Modal/Delete/DeleteDefectModal';
import DefectList from '@/components/organisms/Defects/List/DefectList';

type DefectsProps = {
  data: GetVehicleDefectsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentDefect: Defect;
  changeCurrentDefect: (defect: Defect) => void;
  addDefectModalState: boolean;
  updateDefectModalState: boolean;
  deleteDefectModalState: boolean;
  changeAddDefectModalState: (newState: boolean) => void;
  changeUpdateDefectModalState: (newState: boolean) => void;
  changeDeleteDefectModalState: (newState: boolean) => void;
};

const DefectsPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
  quickAction,
  quickActionLabel,
  currentDefect,
  changeCurrentDefect,
  addDefectModalState,
  updateDefectModalState,
  deleteDefectModalState,
  changeAddDefectModalState,
  changeUpdateDefectModalState,
  changeDeleteDefectModalState,
}: DefectsProps) => {
  return (
    <DefectTemplate
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
          <CreateDefectModal
            modalState={addDefectModalState}
            changeModalState={changeAddDefectModalState}
          />
          <UpdateDefectModal
            currentDefect={currentDefect}
            modalState={updateDefectModalState}
            changeModalState={changeUpdateDefectModalState}
          />
          <DeleteDefectModal
            currentDefect={currentDefect}
            modalState={deleteDefectModalState}
            changeModalState={changeDeleteDefectModalState}
          />
          <DefectList
            data={data}
            loading={loading}
            error={error}
            changeAddDefectModalState={changeAddDefectModalState}
            changeDeleteDefectModalState={changeDeleteDefectModalState}
            changeUpdateDefectModalState={changeUpdateDefectModalState}
            changeCurrentDefect={changeCurrentDefect}
          />
        </>
      }
    />
  );
};

export default DefectsPage;
