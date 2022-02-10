import { ReactNode } from 'react';

type TableItemProps = {
  children: ReactNode;
};

const TableItem = ({ children }: TableItemProps) => {
  return (
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center">
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{children}</div>
        </div>
      </div>
    </td>
  );
};

export default TableItem;
