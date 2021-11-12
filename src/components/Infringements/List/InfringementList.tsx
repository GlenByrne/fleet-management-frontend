import Loading from 'core/Loading';
import { ApolloError } from '@apollo/client';
import { GetDriversQuery, UsersPayload } from 'generated/graphql';
import InfringementListItem from './InfringementListItem';

type InfringementListProps = {
  data: GetDriversQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const InfringementList = ({ data, loading, error }: InfringementListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const drivers = data.drivers as UsersPayload[];

  return drivers.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {drivers.map((driver) => (
          <InfringementListItem key={driver.id} driver={driver} />
        ))}
      </ul>
    </div>
  ) : (
    <div></div>
  );
};

export default InfringementList;
