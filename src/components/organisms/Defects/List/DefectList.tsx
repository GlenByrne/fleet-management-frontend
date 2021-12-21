import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import {
  Defect,
  GetVehicleDefectsQuery,
  useGetVehicleDefectsQuery,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';

type DefectListProps = {
  data: GetVehicleDefectsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentDefect: (defect: Defect) => void;
  changeAddDefectModalState: (newState: boolean) => void;
  changeDeleteDefectModalState: (newState: boolean) => void;
  changeUpdateDefectModalState: (newState: boolean) => void;
};

const DefectList = ({
  data,
  loading,
  error,
  changeCurrentDefect,
  changeAddDefectModalState,
  changeDeleteDefectModalState,
  changeUpdateDefectModalState,
}: DefectListProps) => {
  const router = useRouter();
  const vehicleId = String(router.query.vehicleId);

  // const [shouldSkip, setShouldSkip] = useState(true);

  // useEffect(() => {
  //   if (id) {
  //     setShouldSkip(false);
  //   }
  // }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    <div></div>;
  }

  const defects = data?.defectsForVehicle as Defect[];

  return defects.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {defects.map((defect) => (
          <li key={defect.id}>
            <Link href="#">
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {defect.description}
                    </p>
                    <div className="ml-2 shrink-0 flex">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentDefect(defect);
                          changeDeleteDefectModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Reported By: {defect.reporter}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        Date Reported: {defect.dateReported}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Date Completed: {defect.dateCompleted}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        Status: {defect.status}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        changeCurrentDefect(defect);
                        changeUpdateDefectModalState(true);
                      }}
                    />
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddDefectModalState(true)}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      text="Add a new defect"
    />
  );
};

export default DefectList;
