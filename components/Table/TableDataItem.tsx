import { FC, ReactNode } from 'react';

type TableDataItemProps = {
  children: ReactNode;
};

const TableDataItem: FC<TableDataItemProps> = ({ children }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{children}</div>
        </div>
      </div>
    </td>
  );
};

export default TableDataItem;
