import { useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import Table from '../Table/Table';
import TableColumnHeader from '../Table/TableColumnHeader';
import { GET_TOLL_TAGS } from '../../lib/queries';
import { TollTag } from '../Vehicles/Vehicles.types';
import Button from '../Table/Button';
import TollTagListItem from './TollTagListItem';
import UpdateTollTagModal from './UpdateTollTagModal';

type TollTagListProps = {
  setModalState: (state: boolean) => void;
};

const TollTagList: FC<TollTagListProps> = ({ setModalState }) => {
  const [open, setOpen] = useState(false);

  const updateTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

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
            <Button
              onClick={() => {
                setModalState(true);
              }}
            >
              Add Tag
            </Button>
          </TableColumnHeader>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {data.tollTags.length > 0 ? (
          data.tollTags.map((tollTag: TollTag) => (
            <Fragment key={tollTag.id}>
              <TollTagListItem
                tollTag={tollTag}
                setModalState={updateTollTagModalHandler}
              />
              <UpdateTollTagModal
                modalState={open}
                setModalState={updateTollTagModalHandler}
                tollTag={tollTag}
              />
            </Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="text-2xl text-center">
              No Toll Tags Found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TollTagList;
