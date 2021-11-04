import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Option } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import { Dialog } from '@headlessui/react';
import {
  Depot,
  Role,
  useGetSelectableItemsForUpdateUserQuery,
  useUpdateUserMutation,
} from 'generated/graphql';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';
import { useReactiveVar } from '@apollo/client';
import {
  currentUserVar,
  errorAlertStateVar,
  updateUserAlertStateVar,
  updateUserModalStateVar,
} from 'constants/apollo-client';

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getRoleOptions = () => {
  const options: Option[] = [
    {
      value: Role.User,
      label: Role.User,
    },
    {
      value: Role.Driver,
      label: Role.Driver,
    },
  ];

  return options;
};

const UpdateUserModal = () => {
  const { data, loading, error } = useGetSelectableItemsForUpdateUserQuery();

  const currentUser = useReactiveVar(currentUserVar);
  const currentModalStateVar = useReactiveVar(updateUserModalStateVar);
  const [roleOptions, setRoleOptions] = useState(getRoleOptions());

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [depot, setDepot] = useState<Option>({
    value: '',
    label: 'None',
  });
  const [role, setRole] = useState<Option>({
    value: Role.User,
    label: Role.User,
  });

  const [depotOptions, setDepotOptions] = useState(
    getDepotOptions(data?.depots as Depot[])
  );

  useEffect(() => {
    setRoleOptions(getRoleOptions());
    setDepotOptions(getDepotOptions(data?.depots as Depot[]));

    setName(currentUser.name);
    setEmail(currentUser.email);
    setDepot({
      value: currentUser.depot != null ? currentUser.depot.id : '',
      label: currentUser.depot != null ? currentUser.depot.name : 'None',
    });
    setRole({
      value: currentUser.role,
      label: currentUser.role,
    });
  }, [currentUser, data]);

  const changeName = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const changeEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateUser] = useUpdateUserMutation();

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    updateUserModalStateVar(false);
    try {
      updateUser({
        variables: {
          data: {
            id: currentUser.id,
            name: name != null ? name : '',
            email: email != null ? email : '',
            depotId: depot.value != null ? depot.value : '',
            role: role.value != null ? (role.value as Role) : Role.User,
          },
        },
      });

      updateUserAlertStateVar(true);
    } catch {
      errorAlertStateVar(true);
    }
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={updateUserModalStateVar}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Update User
              </Dialog.Title>
              <div className="grid grid-cols-6 gap-6 mt-2">
                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={changeName}
                    required={true}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={changeEmail}
                    required={true}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <ModalFormSelect
                    label="Depot"
                    name="depot"
                    selected={depot}
                    onChange={setDepot}
                    options={depotOptions}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <ModalFormSelect
                    label="Role"
                    name="role"
                    selected={role}
                    onChange={setRole}
                    options={roleOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => updateUserModalStateVar(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
