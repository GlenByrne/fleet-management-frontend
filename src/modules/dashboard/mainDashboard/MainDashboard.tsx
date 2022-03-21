import UpcomingCvrtList from '../upcomingCVRTList/UpcomingCvrtList';
import UpcomingTachoCalibrationList from '../upcomingTachoCalibrationList/UpcomingTachoCalibrationList';
import UpcomingThirteenWeekList from '../upcomingThirteenWeekInspection/UpcomingThirteenWeekList';

function MainDashboard() {
  return (
    <>
      <UpcomingCvrtList />
      <UpcomingThirteenWeekList />
      <UpcomingTachoCalibrationList />
    </>
  );
}

export default MainDashboard;
