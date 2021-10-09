import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VEHICLE_DEFECTS } from '../../../lib/queries';
import Table from '../../Table/Table';
import TableColumnHeader from '../../Table/TableHeader';
import { Defect } from '../../../lib/types';
import DefectListItem from './DefectListItem';

const DefectList = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_VEHICLE_DEFECTS, {
    variables: { defectsForVehicleVehicleId: id },
  });

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <div></div>
    // <Table>
    //   <thead className="bg-gray-50">
    //     <tr>
    //       <TableColumnHeader>Date Reported</TableColumnHeader>
    //       <TableColumnHeader>Description</TableColumnHeader>
    //       <TableColumnHeader>Status</TableColumnHeader>
    //       <th scope="col" className="relative px-6 py-3">
    //         <span className="sr-only">Update Status</span>
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody className="bg-white divide-y divide-gray-200">
    //     {data.defectsForVehicle.map((defect: Defect) => (
    //       <DefectListItem key={defect.id} defect={defect} />
    //     ))}
    //   </tbody>
    // </Table>
  );
};

export default DefectList;
