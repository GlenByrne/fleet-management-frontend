import { Fragment } from 'react';
import Button from './Button';
import { IdObj } from '../../constants/types';

type TableRowProps<T, K> = {
  item: T;
  tableData: K;
  setModalState: (state: boolean) => void;
  deleteItemHandler: (id: string) => void;
  // changeCurrentItem: (id: string) => void;
};

const TableRow = <T extends IdObj, K extends object>({
  item,
  tableData,
  setModalState,
  deleteItemHandler,
}: // changeCurrentItem,
TableRowProps<T, K>) => {
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
            // changeCurrentItem(item.id);
            setModalState(true);
          }}
        >
          Edit
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={() => deleteItemHandler(item.id)}>Delete</Button>
      </td>
    </tr>
  );
};

export default TableRow;
