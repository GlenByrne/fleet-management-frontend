import { Fragment, ReactNode } from 'react';
import { IdObj } from 'constants/types';
import TableHeader from './TableHeader';
import TableLayout from './TableLayout';

type TableProps<T> = {
  renderItem: (item: T) => ReactNode;
  data: T[] | undefined;
  columnHeaders: string[];
};

const Table = <T extends IdObj>({
  data,
  renderItem,
  columnHeaders,
}: TableProps<T>): JSX.Element => {
  return (
    <TableLayout>
      <thead className="bg-gray-50">
        <tr>
          {columnHeaders.map((columnHeader, index) => {
            return <TableHeader key={index}>{columnHeader}</TableHeader>;
          })}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {data !== undefined && data.length > 0 ? (
          data.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="text-2xl text-center">
              No Items Found
            </td>
          </tr>
        )}
      </tbody>
    </TableLayout>
  );
};

export default Table;
