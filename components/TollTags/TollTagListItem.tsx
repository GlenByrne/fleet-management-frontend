import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { DELETE_TOLL_TAG, GET_TOLL_TAGS } from '../../lib/queries';
import Button from '../Table/Button';
import TableDataItem from '../Table/TableDataItem';
import { TollTag } from '../Vehicles/Vehicles.types';

type TollTagListItemProps = {
  tollTag: TollTag;
  setModalState: (state: boolean) => void;
};

const TollTagListItem: FC<TollTagListItemProps> = ({
  tollTag,
  setModalState,
}) => {
  const [deleteTollTag] = useMutation(DELETE_TOLL_TAG, {
    refetchQueries: [GET_TOLL_TAGS, 'GetTollTags'],
  });

  const deleteTagHandler = () => {
    deleteTollTag({
      variables: {
        deleteTollTagData: {
          id: tollTag.id,
        },
      },
    });
  };

  return (
    <tr key={tollTag.id}>
      <TableDataItem>{tollTag.tagNumber}</TableDataItem>
      <TableDataItem>{tollTag.tagProvider}</TableDataItem>
      <TableDataItem>{tollTag.depot.name}</TableDataItem>
      <TableDataItem>
        {tollTag.vehicle != null ? tollTag.vehicle.registration : 'None'}
      </TableDataItem>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button
          onClick={() => {
            setModalState(true);
          }}
        >
          Edit
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={deleteTagHandler}>Delete</Button>
      </td>
    </tr>
  );
};

export default TollTagListItem;
