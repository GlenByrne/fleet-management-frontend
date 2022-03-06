import Loading from '@/components/atoms/Loading';
import {
  useGetUpcomingThirteenWeekQuery,
  VehicleEdge,
  VehicleType,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import UpcomingThirteenWeekListItem from './UpcomingThirteenWeekListItem';

const UpcomingThirteenWeekList = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetUpcomingThirteenWeekQuery({
    variables: {
      first: 10,
      data: {
        organisationId: organisationId,
      },
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  const vehiclesUpcomingThirteenWeek = data?.upcomingThirteenWeek
    .edges as VehicleEdge[];

  const vans = vehiclesUpcomingThirteenWeek.filter(
    (vehicle) => vehicle.node.type === VehicleType.Van
  );
  const trucks = vehiclesUpcomingThirteenWeek.filter(
    (vehicle) => vehicle.node.type === VehicleType.Truck
  );
  const trailers = vehiclesUpcomingThirteenWeek.filter(
    (vehicle) => vehicle.node.type === VehicleType.Trailer
  );

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="grid grid-cols-5 gap-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium leading-6 text-gray-900">
              Vans
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {vans.map((vehicle) => (
              <UpcomingThirteenWeekListItem
                key={vehicle.node.id}
                vehicle={vehicle.node}
              />
            ))}
          </ul>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium leading-6 text-gray-900">
              Trucks
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {trucks.map((vehicle) => (
              <UpcomingThirteenWeekListItem
                key={vehicle.node.id}
                vehicle={vehicle.node}
              />
            ))}
          </ul>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium leading-6 text-gray-900">
              Trailers
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {trailers.map((vehicle) => (
              <UpcomingThirteenWeekListItem
                key={vehicle.node.id}
                vehicle={vehicle.node}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpcomingThirteenWeekList;
