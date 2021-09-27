import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Table from '../../Table/Table';
import TableColumnHeader from '../../Table/TableColumnHeader';
import DefectListItem from './DefectListItem';

const QUERY = gql`
  query GetVehicleDefects($defectsForVehicleVehicleId: ID!) {
    defectsForVehicle(vehicleId: $defectsForVehicleVehicleId) {
      id
      description
      dateReported
      dateCompleted
      status
    }
  }
`;

// export type Defect = {
//   id: string;
//   dateReported: string;
//   description: string;
//   status: string;
// };

// const data: Defect[] = [
//   {
//     id: '1',
//     dateReported: '25/09/21',
//     description: 'Dents and scratches on both sides of van',
//     status: 'Incomplete',
//   },
//   {
//     id: '2',
//     dateReported: '25/09/21',
//     description: 'Damage to front bumper of van',
//     status: 'Incomplete',
//   },
//   {
//     id: '3',
//     dateReported: '25/09/21',
//     description: 'Engine light on',
//     status: 'Incomplete',
//   },
// ];

const DefectList = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(QUERY, {
    variables: { defectsForVehicleVehicleId: id },
  });

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Table>
      <thead className="bg-gray-50">
        <tr>
          <TableColumnHeader>Date Reported</TableColumnHeader>
          <TableColumnHeader>Description</TableColumnHeader>
          <TableColumnHeader>Status</TableColumnHeader>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Update Status</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.defectsForVehicle.map((defect: any) => (
          <DefectListItem key={defect.id} defect={defect} />
        ))}
      </tbody>
    </Table>
  );
};

export default DefectList;
