import { ReactNode } from 'react';

type TableHeaderProps = {
  children: ReactNode;
};

const TableHeader = ({ children }: TableHeaderProps) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
    >
      {children}
    </th>
  );
};

export default TableHeader;
