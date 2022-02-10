import { Option } from '@/constants/types';
import classNames from '@/utilities/classNames';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';

type SelectOptionProps = {
  option: Option;
};

const SelectOption = ({ option }: SelectOptionProps) => {
  return (
    <Listbox.Option
      key={option.value}
      className={({ active }) =>
        classNames(
          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9'
        )
      }
      value={option}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              selected ? 'font-semibold' : 'font-normal',
              'block truncate'
            )}
          >
            {option.label}
          </span>

          {selected ? (
            <span
              className={classNames(
                active ? 'text-white' : 'text-indigo-600',
                'absolute inset-y-0 right-0 flex items-center pr-4'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

export default SelectOption;
