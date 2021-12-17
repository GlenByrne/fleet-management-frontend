import Loading from '@/components/atoms/Loading';
import {
  UpcomingMaintenaceQuery,
  Vehicle,
  VehicleType,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import UpcomingCvrtList from './UpcomingCvrtList';
import UpcomingTachoCalibrationList from './UpcomingTachoCalibrationList';
import UpcomingThirteenWeekList from './UpcomingThirteenWeekList';

type DashboardProps = {
  data: UpcomingMaintenaceQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const Dashboard = ({ data, loading, error }: DashboardProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h2>Error</h2>;
  }

  if (!data) {
    <div></div>;
  }

  const vehiclesUpcomingCVRT = data?.upcomingCVRT as Vehicle[];
  const vehiclesUpcomingThirteenWeek = data?.upcomingThirteenWeek as Vehicle[];
  const vehiclesUpcomingTachoCalibration =
    data?.upcomingTachoCalibration as Vehicle[];

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

export default Dashboard;
