import { IdObj } from '@/constants/types';
import { Fragment, ReactNode } from 'react';
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

      <tbody className="divide-y divide-gray-200 bg-white">
        {data !== undefined && data.length > 0 ? (
          data.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="text-center text-2xl">
              No Items Found
            </td>
          </tr>
        )}
      </tbody>
    </TableLayout>
  );
};

export default Table;
