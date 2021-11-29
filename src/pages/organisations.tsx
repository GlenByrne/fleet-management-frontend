import { NextPage } from 'next';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';
import DeleteFuelCardModal from 'components/FuelCards/Modal/Delete/DeleteFuelCardModal';
import { useGetFuelCardsQuery } from 'generated/graphql';
import MainLayout from 'core/Layout/MainLayout/MainLayout';

const Organisations: NextPage = () => {
  return (
    <MainLayout hasQuickActionButton={false} pageSearchable={false}>
      <h1>Test Test Test No Orgs Mate</h1>
    </MainLayout>
  );
};

export default Organisations;
