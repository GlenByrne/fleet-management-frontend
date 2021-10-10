import { FC, Fragment } from 'react';
import { SelectObject } from '../../lib/types';

type ModalFormSelectProps<T> = {
  title: string;
  name: string;
  ref: any;
  required: boolean;
  items: T[] | undefined;
};

const ModalFormSelect = <T extends SelectObject>({
  title,
  name,
  ref,
  required,
  items,
}: ModalFormSelectProps<T>) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <select
        ref={(value) => (ref = value)}
        id={name}
        name={name}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
      >
        {items != null ? (
          items.map((item: T) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })
        ) : (
          <option disabled={true}>No Items Found</option>
        )}
      </select>
    </div>
  );
};

export default ModalFormSelect;
