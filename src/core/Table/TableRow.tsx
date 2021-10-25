import { Fragment } from 'react';
import Button from './Button';
import { IdObj } from '../../constants/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

type TableRowProps<T, K> = {
  item: T;
  tableData: K;
  setUpdateModalState: (state: boolean) => void;
  setDeleteModalState: (state: boolean) => void;
  changeCurrentItem: (item: T) => void;
};

const TableRow = <T extends IdObj, K extends object>({
  item,
  tableData,
  setUpdateModalState,
  setDeleteModalState,
  changeCurrentItem,
}: TableRowProps<T, K>) => {
  // const router = useRouter();

  //   const showDefectsHandler = () => {
  //     router.push('/defects/' + vehicle.id);
  //   };

  return (
    <tr key={item.id}>
      {Object.keys(tableData).map((key) => {
        return <Fragment key={key}>{(tableData as any)[key]}</Fragment>;
      })}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button
          onClick={() => {
            changeCurrentItem(item);
            setUpdateModalState(true);
          }}
        >
          <PencilIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button
          onClick={() => {
            changeCurrentItem(item);
            setDeleteModalState(true);
          }}
        >
          <TrashIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
