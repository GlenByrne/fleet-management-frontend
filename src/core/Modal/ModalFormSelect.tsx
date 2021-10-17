import { ChangeEvent, FC, forwardRef, Ref } from 'react';
import { Option } from 'constants/types';

type ModalFormSelectProps = {
  label: string;
  name: string;
  required: boolean;
  options: Option[] | undefined;
  defaultValue?: string;
  // value?: string;
  // onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const ModalFormSelect = forwardRef(
  (
    { label, name, required, options, defaultValue }: ModalFormSelectProps,
    ref: Ref<HTMLSelectElement>
  ) => {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {/* <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
      >
        {options != null ? (
          options.map((option: Option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            );
          })
        ) : (
          <option disabled={true}>No Items Found</option>
        )}
      </select> */}
        <select
          ref={ref}
          id={name}
          name={name}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required={required}
          defaultValue={defaultValue}
        >
          {options != null ? (
            options.map((option: Option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })
          ) : (
            <option disabled={true}>No Items Found</option>
          )}
        </select>
      </div>
    );
  }
);

ModalFormSelect.displayName = 'ModalFormSelect';

export default ModalFormSelect;
