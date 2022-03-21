type DatePickerSelectButtonProps = {
  text: string;
  name: string;
};

function DatePickerSelectButton({ text, name }: DatePickerSelectButtonProps) {
  return (
    <button
      type="button"
      name={name}
      className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      {text}
    </button>
  );
}

export default DatePickerSelectButton;
