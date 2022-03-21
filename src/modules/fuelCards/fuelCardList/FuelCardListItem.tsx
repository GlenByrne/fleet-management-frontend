import Link from 'next/link';
import React from 'react';
import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { FuelCard } from '@/generated/graphql';

type FuelCardListItemProps = {
  fuelCard: FuelCard;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
  changeDeleteFuelCardModalState: (newState: boolean) => void;
  changeUpdateFuelCardModalState: (newState: boolean) => void;
};

function FuelCardListItem({
  fuelCard,
  changeCurrentFuelCard,
  changeDeleteFuelCardModalState,
  changeUpdateFuelCardModalState,
}: FuelCardListItemProps) {
  return (
    <li>
      <Link href="#">
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {fuelCard.cardNumber}
              </p>
              <div className="ml-2 flex shrink-0">
                <DeleteButton
                  onClick={() => {
                    changeCurrentFuelCard(fuelCard);
                    changeDeleteFuelCardModalState(true);
                  }}
                />
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Provider: {fuelCard.cardProvider}
                </p>
              </div>
              <EditButton
                onClick={() => {
                  changeCurrentFuelCard(fuelCard);
                  changeUpdateFuelCardModalState(true);
                }}
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default FuelCardListItem;
