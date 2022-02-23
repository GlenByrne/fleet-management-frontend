import Loading from '@/components/atoms/Loading';
import {
  GetUpcomingCvrtQuery,
  GetUpcomingTachoCalibrationQuery,
  GetUpcomingThirteenWeekQuery,
  Vehicle,
  VehicleType,
} from '@/generated/graphql';
import { UseQueryState } from 'urql';
import UpcomingCvrtList from '../upcomingCVRTList/UpcomingCvrtList';
import UpcomingTachoCalibrationList from '../upcomingTachoCalibrationList/UpcomingTachoCalibrationList';
import UpcomingThirteenWeekList from '../upcomingThirteenWeekInspection/UpcomingThirteenWeekList';

type MainDashboardProps = {
  upcomingCVRT: UseQueryState<GetUpcomingCvrtQuery, object>;
  upcomingThirteenWeek: UseQueryState<GetUpcomingThirteenWeekQuery, object>;
  upcomingTachoCalibration: UseQueryState<
    GetUpcomingTachoCalibrationQuery,
    object
  >;
};

const MainDashboard = ({
  upcomingCVRT,
  upcomingThirteenWeek,
  upcomingTachoCalibration,
}: MainDashboardProps) => {
  const error =
    upcomingCVRT.error ||
    upcomingThirteenWeek.error ||
    upcomingTachoCalibration.error;

  const loading =
    upcomingCVRT.fetching ||
    upcomingThirteenWeek.fetching ||
    upcomingTachoCalibration.fetching;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h2>Error</h2>;
  }

  const vehiclesUpcomingCVRT = upcomingCVRT.data?.upcomingCVRT as Vehicle[];
  const vehiclesUpcomingThirteenWeek = upcomingThirteenWeek.data
    ?.upcomingThirteenWeek as Vehicle[];
  const vehiclesUpcomingTachoCalibration = upcomingTachoCalibration.data
    ?.upcomingTachoCalibration as Vehicle[];

  const vansUpcomingCVRT = vehiclesUpcomingCVRT.filter(
    (vehicle) => vehicle.type === VehicleType.Van
  );
  const trucksUpcomingCVRT = vehiclesUpcomingCVRT.filter(
    (vehicle) => vehicle.type === VehicleType.Truck
  );
  const trailersUpcomingCVRT = vehiclesUpcomingCVRT.filter(
    (vehicle) => vehicle.type === VehicleType.Trailer
  );

  const vansUpcomingThirteenWeek = vehiclesUpcomingThirteenWeek.filter(
    (vehicle) => vehicle.type === VehicleType.Van
  );
  const trucksUpcomingThirteenWeek = vehiclesUpcomingThirteenWeek.filter(
    (vehicle) => vehicle.type === VehicleType.Truck
  );
  const trailersUpcomingThirteenWeek = vehiclesUpcomingThirteenWeek.filter(
    (vehicle) => vehicle.type === VehicleType.Trailer
  );

  const vansUpcomingTachoCalibration = vehiclesUpcomingTachoCalibration.filter(
    (vehicle) => vehicle.type === VehicleType.Van
  );
  const trucksUpcomingTachoCalibration =
    vehiclesUpcomingTachoCalibration.filter(
      (vehicle) => vehicle.type === VehicleType.Truck
    );
  const trailersUpcomingTachoCalibration =
    vehiclesUpcomingTachoCalibration.filter(
      (vehicle) => vehicle.type === VehicleType.Trailer
    );

  return (
    <>
      <UpcomingCvrtList
        vans={vansUpcomingCVRT}
        trucks={trucksUpcomingCVRT}
        trailers={trailersUpcomingCVRT}
      />
      <UpcomingThirteenWeekList
        vans={vansUpcomingThirteenWeek}
        trucks={trucksUpcomingThirteenWeek}
        trailers={trailersUpcomingThirteenWeek}
      />
      <UpcomingTachoCalibrationList
        vans={vansUpcomingTachoCalibration}
        trucks={trucksUpcomingTachoCalibration}
        trailers={trailersUpcomingTachoCalibration}
      />
    </>
  );
};

export default MainDashboard;
