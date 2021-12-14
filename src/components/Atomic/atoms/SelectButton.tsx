import { Option } from '@/constants/types';
import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';

type SelectButtonProps = {
  selected: Option;
};

const SelectButton = ({ selected }: SelectButtonProps) => {
  return (
    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <span className="block truncate">
        {selected.label == '' ? 'None' : selected.label}
      </span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
};

export default SelectButton;
