import { useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import { ADD_TOLL_TAG, GET_TOLL_TAGS } from 'constants/queries';
import { TollTag } from 'constants/types';
import Button from 'core/Table/Button';
import UpdateTollTagModal from '../Modal/Update/UpdateTollTagModal';
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
  const [open, setOpen] = useState(false);

  const updateTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

  // const headings: ColumnDefinitionType<TollTag, keyof TollTag>[] = [
  //   { key: 'tagNumber', header: 'Tag Number' },
  //   { key: 'tagProvider', header: 'Provider' },
  //   { key: 'depot', header: 'Depot' },
  //   { key: 'vehicle', header: 'Assigned Vehicle' },
  // { key: 'empty', header: '' },
  // {
  //   child: (
  //     <Button
  //       onClick={() => {
  //         setModalState(true);
  //       }}
  //     >
  //       Add Tag
  //     </Button>
  //   ),
  // },
  // ];

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
          />
        );
      }}
    />

    // <Table>
    //   <thead className="bg-gray-50">
    //     <tr>
    //       {headings.map((heading, index) => {
    //         return (
    //           <TableColumnHeader key={index}>{heading.child}</TableColumnHeader>
    //         );
    //       })}
    //     </tr>
    //   </thead>

    //   <tbody className="bg-white divide-y divide-gray-200">
    //     {data.tollTags.length > 0 ? (
    //       data.tollTags.map((tollTag: TollTag) => (
    //         <Fragment key={tollTag.id}>
    //           <TollTagListItem
    //             tollTag={tollTag}
    //             setModalState={updateTollTagModalHandler}
    //           />
    //           <UpdateTollTagModal
    //             modalState={open}
    //             setModalState={updateTollTagModalHandler}
    //             tollTag={tollTag}
    //           />
    //         </Fragment>
    //       ))
    //     ) : (
    //       <tr>
    //         <td colSpan={12} className="text-2xl text-center">
    //           No Toll Tags Found
    //         </td>
    //       </tr>
    //     )}
    //   </tbody>
    // </Table>
  );
};

export default TollTagList;
