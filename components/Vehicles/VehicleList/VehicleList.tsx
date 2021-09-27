import VehicleListItem from './VehicleListItem';
import { useQuery, gql } from '@apollo/client';
import { FC } from 'react';
import Table from '../../Table/Table';
import TableColumnHeader from '../../Table/TableColumnHeader';

const QUERY = gql`
  query Query {
    vehicles {
      id
      registration
      make
      model
      owner
      cvrtDueDate
      thirteenWeekInspectionDueDate
      tachoCalibrationDueDate
    }
  }
`;

// export type Vehicle = {
//   id: string;
//   registration: string;
//   make: string;
//   model: string;
//   depot: string;
//   owner: string;
//   fuelCardNumber: string;
//   tollTagNumber: string;
//   cvrtDueDate: string;
//   thirteenWeekInspectionDate: string;
//   tachoCalibrationDate: string;
//   defects: Defect[];
// };

// type Defect = {
//   id: string;
//   dateReported: string;
//   description: string;
//   status: string;
// };

// const data: Vehicle[] = [
//   {
//     id: '1',
//     registration: '192-D-9999',
//     make: 'Opel',
//     model: 'Movano',
//     depot: 'Stadium',
//     owner: 'Dennenhys',
//     fuelCardNumber: '123456789',
//     tollTagNumber: '45678',
//     cvrtDueDate: '12/12/21',
//     thirteenWeekInspectionDate: '12/12/21',
//     tachoCalibrationDate: '12/12/21',
//     defects: [
//       {
//         id: '1',
//         dateReported: '12/11/21',
//         description: 'This is a test defect',
//         status: 'Incomplete',
//       },
//       {
//         id: '2',
//         dateReported: '12/11/21',
//         description: 'This is a test defect',
//         status: 'Incomplete',
//       },
//     ],
//   },
//   {
//     id: '2',
//     registration: '201-D-4444',
//     make: 'Opel',
//     model: 'Movano',
//     depot: 'Stadium',
//     owner: 'Dennenhys',
//     fuelCardNumber: '123456789',
//     tollTagNumber: '45678',
//     cvrtDueDate: '12/12/21',
//     thirteenWeekInspectionDate: '12/12/21',
//     tachoCalibrationDate: '12/12/21',
//     defects: [
//       {
//         id: '3',
//         dateReported: '12/11/21',
//         description: 'This is a test defect',
//         status: 'Incomplete',
//       },
//       {
//         id: '4',
//         dateReported: '12/11/21',
//         description: 'This is a test defect',
//         status: 'Incomplete',
//       },
//     ],
//   },
//   {
//     id: '3',
//     registration: '211-D-12345',
//     make: 'Opel',
//     model: 'Movano',
//     depot: 'Stadium',
//     owner: 'Dennenhys',
//     fuelCardNumber: '123456789',
//     tollTagNumber: '45678',
//     cvrtDueDate: '12/12/21',
//     thirteenWeekInspectionDate: '12/12/21',
//     tachoCalibrationDate: '12/12/21',
//     defects: [
//       {
//         id: '5',
//         dateReported: '12/11/21',
//         description: 'This is a test defect',
//         status: 'Incomplete',
//       },
//       {
//         id: '6',
//         dateReported: '12/11/21',
//         description: 'This is a test defect',
//         status: 'Incomplete',
//       },
//     ],
//   },
// ];

const VehicleList: FC = () => {
  const { data, loading, error } = useQuery(QUERY);

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
          <TableColumnHeader>Registration</TableColumnHeader>
          <TableColumnHeader>Make</TableColumnHeader>
          <TableColumnHeader>Model</TableColumnHeader>
          <TableColumnHeader>Depot</TableColumnHeader>
          <TableColumnHeader>Owner</TableColumnHeader>
          <TableColumnHeader>Fuel Card</TableColumnHeader>
          <TableColumnHeader>Toll Tag</TableColumnHeader>
          <TableColumnHeader>CVRT Due Date</TableColumnHeader>
          <TableColumnHeader>13 Week Inspection</TableColumnHeader>
          <TableColumnHeader>Tacho Calibration</TableColumnHeader>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Defects</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.vehicles.map((vehicle: any) => (
          <VehicleListItem key={vehicle.id} vehicle={vehicle} />
        ))}
      </tbody>
    </Table>
  );
};

export default VehicleList;
