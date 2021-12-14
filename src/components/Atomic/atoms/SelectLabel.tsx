import { Listbox } from '@headlessui/react';

type SelectLabelProps = {
  htmlFor: string;
  label: string;
};

const SelectLabel = ({ htmlFor, label }: SelectLabelProps) => {
  return (
    <Listbox.Label
      className="block text-sm font-medium text-gray-700"
      htmlFor={htmlFor}
    >
      {label}
    </Listbox.Label>
  );
};

export default SelectLabel;
