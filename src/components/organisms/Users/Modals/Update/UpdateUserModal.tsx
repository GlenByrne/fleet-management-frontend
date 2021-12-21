import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import {
  Depot,
  Role,
  useGetUpdateUserOptionsQuery,
  useUpdateUserOrgDetailsMutation,
} from '@/generated/graphql';
import { Option, UserUpdateModalItem } from '@/constants/types';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import Modal from '@/components/atoms/Modal';
import ModalFormSelect from '@/components/molecules/ModalFormSelect';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';

type UpdateUserModalProps = {
  currentUser: UserUpdateModalItem;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

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

const UpdateUserModal = ({
  currentUser,
  modalState,
  changeModalState,
}: UpdateUserModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetUpdateUserOptionsQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const [roleOptions, setRoleOptions] = useState(getRoleOptions());

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

    setDepot({
      value: currentUser.depot != null ? currentUser.depot.id : '',
      label: currentUser.depot != null ? currentUser.depot.name : 'None',
    });
    setRole({
      value: currentUser.role,
      label: currentUser.role,
    });
  }, [currentUser, data]);

  const cancelButtonRef = useRef(null);

  const [updateUser] = useUpdateUserOrgDetailsMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await updateUser({
        variables: {
          data: {
            userId: currentUser.id,
            organisationId,
            depotId: depot.value != null ? depot.value : '',
            role: role.value != null ? (role.value as Role) : Role.User,
          },
        },
      });

      successTextVar('User updated successfully');
      successAlertStateVar(true);
    } catch {}
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
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
            <SuccessButton text="Save" type="submit" />
            <CancelButton
              onClick={() => changeModalState(false)}
              ref={cancelButtonRef}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
