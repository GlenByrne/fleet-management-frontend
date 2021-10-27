import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  deleteFuelCardModalStateVar,
  updateFuelCardModalStateVar,
} from 'constants/apollo-client';
import Button from 'core/Table/Button';
import { FuelCard } from 'generated/graphql';

type FuelCardListItemProps = {
  fuelCard: FuelCard;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
};

const FuelCardListItem = ({
  fuelCard,
  changeCurrentFuelCard,
}: FuelCardListItemProps) => {
  return (
    <li>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {fuelCard.cardNumber}
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <Button
                onClick={() => {
                  changeCurrentFuelCard(fuelCard);
                  deleteFuelCardModalStateVar(true);
                }}
              >
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                Provider: {fuelCard.cardProvider}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                <LocationMarkerIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {fuelCard.depot?.name}
              </p>
            </div>
            <Button
              onClick={() => {
                changeCurrentFuelCard(fuelCard);
                updateFuelCardModalStateVar(true);
              }}
            >
              <PencilIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </a>
    </li>
  );
};

export default FuelCardListItem;
