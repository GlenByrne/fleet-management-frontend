import { Defect } from '../../constants/types';
// import { Defect } from './DefectList';

type DefectItemProps = {
  defect: Defect;
};

const DefectListItem = ({ defect }: DefectItemProps) => {
  return (
    <div></div>
    // <tr key={defect.id}>
    //   <TableDataItem>{defect.dateReported}</TableDataItem>
    //   <TableDataItem>
    //     <div className="break-normal">{defect.description}</div>
    //   </TableDataItem>
    //   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    //     <a href="#" className="text-indigo-600 hover:text-indigo-900">
    //       Update Status
    //     </a>
    //   </td>
    // </tr>
  );
};

export default DefectListItem;
