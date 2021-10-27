import { NextPage } from 'next';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import Layout from 'core/Layout/Layout';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';
import DeleteFuelCardModal from 'components/FuelCards/Modal/Delete/DeleteFuelCardModal';
import { addFuelCardModalStateVar } from 'constants/apollo-client';

const FuelCards: NextPage = () => {
  return (
    <Layout quickAction={addFuelCardModalStateVar} quickActionLabel="New Card">
      <CreateFuelCardModal />
      <UpdateFuelCardModal />
      <DeleteFuelCardModal />
      <FuelCardList />
    </Layout>
  );
};
export default FuelCards;
