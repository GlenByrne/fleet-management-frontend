import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import {
  DepotEdge,
  Role,
  useGetDepotsQuery,
  useUpdateUserOrgDetailsMutation,
} from '@/generated/graphql';
import { Option, UserUpdateModalItem } from '@/constants/types';
import Modal from '@/components/atoms/Modal';
import ModalFormSelect from '@/components/molecules/Inputs/ModalFormSelect';
import SuccessButton from '@/components/atoms/Button/SuccessButton';
import CancelButton from '@/components/atoms/Button/CancelButton';

type UpdateUserModalProps = {
  currentUser: UserUpdateModalItem;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const getDepotOptions = (depots: DepotEdge[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.node.id, label: depot.node.name } as Option)
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

  const { data, loading, error } = useGetDepotsQuery({
    variables: {
      first: 5,
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
    getDepotOptions(data?.depots.edges as DepotEdge[])
  );

  useEffect(() => {
    setRoleOptions(getRoleOptions());
    setDepotOptions(getDepotOptions(data?.depots.edges as DepotEdge[]));

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
      <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Update User
              </Dialog.Title>
              <div className="mt-2 grid grid-cols-6 gap-6">
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
