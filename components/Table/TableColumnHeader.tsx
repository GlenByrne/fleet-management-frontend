import { FC, ReactNode } from 'react';

type TableColumnHeaderProps = {
  children: ReactNode;
};

const TableColumnHeader: FC<TableColumnHeaderProps> = ({ children }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  );
};

export default TableColumnHeader;
