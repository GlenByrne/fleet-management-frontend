import { Option } from '@/constants/types';
import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';

type SelectButtonProps = {
  selected: Option;
};

const SelectButton = ({ selected }: SelectButtonProps) => {
  return (
    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
      <span className="block truncate">
        {selected.label == '' ? 'None' : selected.label}
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
};

export default SelectButton;
