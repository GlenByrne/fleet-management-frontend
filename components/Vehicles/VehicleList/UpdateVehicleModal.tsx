/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@apollo/client';
import {
  UPDATE_VEHICLE,
  GET_SELECTABLE_ITEMS_FOR_UPDATE_VEHICLE,
  GET_VEHICLE_LIST,
} from '../../../lib/queries';
import { Depot, FuelCard, TollTag, Vehicle } from '../../../lib/types';

type UpdateVehicleModalProps = {
  modalState: boolean;
  setModalState: (status: boolean) => void;
  vehicle: Vehicle;
};

const UpdateVehicleModal: FC<UpdateVehicleModalProps> = ({
  modalState,
  setModalState,
  vehicle,
}) => {
  const cancelButtonRef = useRef(null);

  let registration: any,
    make: any,
    model: any,
    owner: any,
    depotId: any,
    fuelCardId: any,
    tollTagId: any;

  const { data, loading, error } = useQuery(
    GET_SELECTABLE_ITEMS_FOR_UPDATE_VEHICLE
  );

  const [updateVehicle] = useMutation(UPDATE_VEHICLE, {
    refetchQueries: [GET_VEHICLE_LIST, 'GetVehicleList'],
  });

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Transition.Root show={modalState} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setModalState}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setModalState(false);
                  updateVehicle({
                    variables: {
                      updateVehicleData: {
                        registration: registration.value,
                        make: make.value,
                        model: model.value,
                        owner: owner.value,
                        depotId: depotId.value,
                        fuelCardId: fuelCardId.value,
                        tollTagId: tollTagId.value,
                      },
                    },
                  });
                }}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Update Vehicle
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="registration"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Registration
                              </label>
                              <input
                                ref={(value) => (registration = value)}
                                type="text"
                                name="registration"
                                id="registration"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={vehicle.registration}
                                required={true}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="make"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Make
                              </label>
                              <input
                                ref={(value) => (make = value)}
                                type="text"
                                name="make"
                                id="make"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={vehicle.make}
                                required={true}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="model"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Model
                              </label>
                              <input
                                ref={(value) => (model = value)}
                                type="text"
                                name="model"
                                id="model"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={vehicle.model}
                                required={true}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="model"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Owner
                              </label>
                              <input
                                ref={(value) => (owner = value)}
                                type="text"
                                name="owner"
                                id="owner"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={vehicle.owner}
                                required={true}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="Depot"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Depot
                              </label>
                              <select
                                ref={(value) => (depotId = value)}
                                id="depot"
                                name="depot"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                defaultValue={vehicle.depot.id}
                                required={true}
                              >
                                {data.depots.map((depot: Depot) => (
                                  <option key={depot.id} value={depot.id}>
                                    {depot.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="fuelCard"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Fuel Card
                              </label>

                              {data.fuelCardsNotAssigned.length > 0 ? (
                                <select
                                  ref={(value) => (fuelCardId = value)}
                                  id="fuelCard"
                                  name="fuelCard"
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  defaultValue={vehicle.fuelCard.id}
                                  required={true}
                                >
                                  {data.fuelCardsNotAssigned.map(
                                    (fuelCard: FuelCard) => (
                                      <option
                                        key={fuelCard.id}
                                        value={fuelCard.id}
                                      >
                                        {fuelCard.cardNumber}
                                      </option>
                                    )
                                  )}
                                </select>
                              ) : (
                                <select
                                  id="fuelCard"
                                  name="fuelCard"
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  defaultValue={vehicle.fuelCard.id}
                                  required={true}
                                >
                                  <option disabled={true} selected={true}>
                                    No Unassigned Fuel Cards
                                  </option>
                                </select>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="tollTag"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Toll Tag
                              </label>
                              <select
                                ref={(value) => (tollTagId = value)}
                                id="tollTag"
                                name="tollTag"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                defaultValue={vehicle.tollTag.id}
                                required={true}
                              >
                                {data.tollTags.map((tollTag: TollTag) => (
                                  <option key={tollTag.id} value={tollTag.id}>
                                    {tollTag.tagNumber}
                                  </option>
                                ))}
                              </select>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalState(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateVehicleModal;
