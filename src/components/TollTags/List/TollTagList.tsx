import { useMutation, useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { DELETE_TOLL_TAG, GET_TOLL_TAGS } from 'constants/queries';
import { TollTag } from 'constants/types';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';
import TableRow from 'core/Table/TableRow';

interface TollTagData {
  tollTags: TollTag[];
}

type TollTagTableData = {
  tagNumber: JSX.Element;
  tagProvider: JSX.Element;
  depot: JSX.Element;
  vehicle?: JSX.Element;
};

const headers: string[] = [
  'Tag Number',
  'Provider',
  'Depot',
  'Vehicle',
  '',
  '',
];

const getTableData = (tollTag: TollTag) => {
  const tableData: TollTagTableData = {
    tagNumber: <TableItem>{tollTag.tagNumber}</TableItem>,
    tagProvider: <TableItem>{tollTag.tagProvider}</TableItem>,
    depot: <TableItem>{tollTag.depot.name}</TableItem>,
    vehicle: (
      <TableItem>
        {tollTag.vehicle != null ? tollTag.vehicle.registration : 'None'}
      </TableItem>
    ),
  };

  return tableData;
};

const TollTagList: FC = () => {
  const [deleteTollTag] = useMutation(DELETE_TOLL_TAG, {
    refetchQueries: [GET_TOLL_TAGS, 'GetTollTags'],
  });

  const deleteTagHandler = (id: string) => {
    deleteTollTag({
      variables: {
        deleteTollTagData: {
          id: id,
        },
      },
    });
  };

  const [open, setOpen] = useState(false);

  const updateTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const { data, loading, error } = useQuery<TollTagData>(GET_TOLL_TAGS, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Table
      columnHeaders={headers}
      data={data?.tollTags}
      renderItem={(item: TollTag) => {
        return (
          <TableRow
            item={item}
            tableData={getTableData(item)}
            setModalState={updateTollTagModalHandler}
            deleteItemHandler={deleteTagHandler}
          />
        );
      }}
    />
  );
};

export default TollTagList;
