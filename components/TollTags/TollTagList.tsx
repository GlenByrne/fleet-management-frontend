import { useQuery } from '@apollo/client';
import { FC } from 'react';
import Table from '../Table/Table';
import TableColumnHeader from '../Table/TableColumnHeader';
import { GET_TOLL_TAGS } from '../../lib/queries';
import { TollTag } from '../Vehicles/Vehicles.types';
import Button from '../Table/Button';
import TollTagListItem from './TollTagListItem';

const TollTagList: FC = () => {
  const { data, loading, error } = useQuery(GET_TOLL_TAGS, {});

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
          <TableColumnHeader>Tag Number</TableColumnHeader>
          <TableColumnHeader>Provider</TableColumnHeader>
          <TableColumnHeader>Depot</TableColumnHeader>
          <TableColumnHeader>Assigned Vehicle</TableColumnHeader>
          <TableColumnHeader>{}</TableColumnHeader>
          <TableColumnHeader>
            <Button onClick={() => {}}>Add Tag</Button>
          </TableColumnHeader>
        </tr>
      </thead>

      {data.tollTags.length === 0 ? (
        <h1 className="text-center">No Toll Tags Found</h1>
      ) : (
        <tbody className="bg-white divide-y divide-gray-200">
          {data.tollTags.map((tollTag: TollTag) => (
            <TollTagListItem key={tollTag.id} tollTag={tollTag} />
          ))}
        </tbody>
      )}
    </Table>
  );
};

export default TollTagList;
