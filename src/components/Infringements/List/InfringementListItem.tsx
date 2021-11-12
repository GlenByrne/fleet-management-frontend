import { ChevronUpIcon } from '@heroicons/react/solid';
import { UsersPayload } from 'generated/graphql';
import { Disclosure } from '@headlessui/react';

type InfringementListItemProps = {
  driver: UsersPayload;
};

const InfringementListItem = ({ driver }: InfringementListItemProps) => {
  return (
    <li>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-4 sm:px-6">
              <span>{driver.name}</span>

              <ChevronUpIcon
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              {driver.infringements.map((infringement) => {
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {infringement.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {infringement.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {infringement.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {infringement.description}
                    </p>
                  </div>
                </div>;
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  );
};

export default InfringementListItem;
