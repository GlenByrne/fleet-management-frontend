import {
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Depot,
  GetUsersInOrganisationDocument,
  GetUsersInOrganisationQuery,
  Role,
  useGetSelectableItemsForAddUserQuery,
  useInviteUserToOrganisationMutation,
} from '@/generated/graphql';
import { Option } from '@/constants/types';
import {
  inviteUserModalStateVar,
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import Modal from '@/core/Modal/Modal';
import ModalFormInput from '@/core/Modal/ModalFormInput';
import ModalFormSelect from '@/core/Modal/ModalFormSelect';

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

const CreateUserModal = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetSelectableItemsForAddUserQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const currentModalStateVar = useReactiveVar(inviteUserModalStateVar);

  const [roleOptions, setRoleOptions] = useState(getRoleOptions());
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
  }, [data]);

  const changeEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const [inviteUserToOrganisation] = useInviteUserToOrganisationMutation({
    update: (cache, { data: mutationReturn }) => {
      const newUser = mutationReturn?.inviteUserToOrganisation;

      const currentUsers = cache.readQuery<GetUsersInOrganisationQuery>({
        query: GetUsersInOrganisationDocument,
      });

      if (currentUsers && newUser) {
        cache.writeQuery({
          query: GetUsersInOrganisationDocument,
          data: {
            usersInOrganisation: [
              { ...currentUsers.usersInOrganisation },
              newUser,
            ],
          },
        });
      }
    },
  });

  const cancelButtonRef = useRef(null);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    inviteUserModalStateVar(false);

    try {
      await inviteUserToOrganisation({
        variables: {
          data: {
            email: email,
            organisationId,
            depotId: depot.value != null ? depot.value : '',
            role: role.value != null ? (role.value as Role) : Role.User,
          },
        },
      });

      successTextVar('Invite sent to user');
      successAlertStateVar(true);
    } catch {}

    setEmail('');
    setDepot({
      value: '',
      label: 'None',
    });
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
      setModalState={inviteUserModalStateVar}
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
                Invite User
              </Dialog.Title>
              <div className="grid grid-cols-6 gap-6 mt-2">
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
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => {
                inviteUserModalStateVar(false);
                setEmail('');
                setDepot({
                  value: '',
                  label: 'None',
                });
              }}
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

export default CreateUserModal;
