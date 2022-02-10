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
  useGetAddUserOptionsQuery,
  useInviteUserToOrganisationMutation,
} from '@/generated/graphql';
import { Option } from '@/constants/types';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/ModalFormInput';
import ModalFormSelect from '@/components/molecules/ModalFormSelect';
import CancelButton from '@/components/atoms/CancelButton';
import SuccessButton from '@/components/atoms/SuccessButton';

type CreateUserModalProps = {
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

const CreateUserModal = ({
  modalState,
  changeModalState,
}: CreateUserModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetAddUserOptionsQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

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
    changeModalState(false);

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
                Invite User
              </Dialog.Title>
              <div className="mt-2 grid grid-cols-6 gap-6">
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
            <SuccessButton text="Add" type="submit" />
            <CancelButton
              onClick={() => {
                changeModalState(false);
                setEmail('');
                setDepot({
                  value: '',
                  label: 'None',
                });
              }}
              ref={cancelButtonRef}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
