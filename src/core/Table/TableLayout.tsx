import { ReactNode } from 'react';

type TableLayoutProps = {
  children: ReactNode;
};

const TableLayout = ({ children }: TableLayoutProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
