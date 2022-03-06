import { Vehicle, VehicleType } from '@/generated/graphql';
import UpcomingCvrtList from '../upcomingCVRTList/UpcomingCvrtList';
import UpcomingTachoCalibrationList from '../upcomingTachoCalibrationList/UpcomingTachoCalibrationList';
import UpcomingThirteenWeekList from '../upcomingThirteenWeekInspection/UpcomingThirteenWeekList';

const MainDashboard = () => {
  return (
    <>
      <UpcomingCvrtList />
      <UpcomingThirteenWeekList />
      <UpcomingTachoCalibrationList />
    </>
  );
};

export default MainDashboard;
