import { useMutation, useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';
import TableRow from 'core/Table/TableRow';
import {
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetTollTagsDocument,
  GetTollTagsQuery,
  GetVehiclesDocument,
  TollTag,
  useDeleteTollTagMutation,
  useGetTollTagsQuery,
} from 'generated/graphql';

type TollTagListProps = {
  updateTollTagModalHandler: (state: boolean) => void;
  changeCurrentTollTag: (tollTag: TollTag) => void;
};

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
    depot: <TableItem>{tollTag.depot?.name}</TableItem>,
    vehicle: (
      <TableItem>
        {tollTag.vehicle != null ? tollTag.vehicle.registration : 'None'}
      </TableItem>
    ),
  };

  return tableData;
};

const TollTagList = ({
  updateTollTagModalHandler,
  changeCurrentTollTag,
}: TollTagListProps) => {
  // const [deleteTollTag] = useMutation<DeleteTollTag>(DELETE_TOLL_TAG, {
  //   update: (cache, { data: mutationReturn }) => {
  //     const currentTollTags = cache.readQuery<GetTollTags>({
  //       query: GET_TOLL_TAGS,
  //     });

  //     const newTollTags = currentTollTags?.tollTags.filter(
  //       (tollTag) => tollTag.id !== mutationReturn?.deleteTollTag.id
  //     );

  //     cache.writeQuery({
  //       query: GET_TOLL_TAGS,
  //       data: { tollTags: newTollTags },
  //     });

  //     cache.evict({
  //       id: mutationReturn?.deleteTollTag.id,
  //     });
  //   },
  // });

  const [deleteTollTag] = useDeleteTollTagMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentTollTags = cache.readQuery<GetTollTagsQuery>({
        query: GetTollTagsDocument,
      });
      const newTollTags = currentTollTags?.tollTags?.filter((tollTag) =>
        tollTag != null
          ? tollTag.id !== mutationReturn?.deleteTollTag.id
          : currentTollTags.tollTags
      );
      cache.writeQuery({
        query: GetTollTagsDocument,
        data: { tollTags: newTollTags },
      });
      cache.evict({
        id: mutationReturn?.deleteTollTag.id,
      });
    },
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
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

  const { data, loading, error } = useGetTollTagsQuery();

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <Table
      columnHeaders={headers}
      data={data.tollTags as TollTag[]}
      renderItem={(item: TollTag) => {
        return (
          <TableRow
            item={item}
            tableData={getTableData(item)}
            setModalState={updateTollTagModalHandler}
            deleteItemHandler={deleteTagHandler}
            changeCurrentItem={changeCurrentTollTag}
          />
        );
      }}
    />
  );
};

export default TollTagList;
