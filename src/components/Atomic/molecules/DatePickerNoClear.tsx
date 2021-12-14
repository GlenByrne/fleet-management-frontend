import { SetStateAction } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import CalendarContainer from '@/components/Atomic/atoms/CalendarContainer';
import FormLabel from '@/components/Atomic/atoms/InputLabel';
import DatePickerSelectButton from '@/components/Atomic/atoms/DatePickerSelectButton';
import ChevronLeftButton from '@/components/Atomic/atoms/ChevronLeftButton';
import ChevronRightButton from '@/components/Atomic/atoms/ChevronRightButton';

type DatePickProps = {
  label: string;
  name: string;
  selected: Date;
  required: boolean;
  onChange: (value: SetStateAction<Date>) => void;
};

const DatePickerNoClear = ({
  label,
  name,
  selected,
  required,
  onChange,
}: DatePickProps) => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={(date: Date) => onChange(date)}
      startDate={selected}
      required={required}
      placeholderText="None"
      nextMonthButtonLabel=">"
      previousMonthButtonLabel="<"
      popperClassName="react-datepicker-left"
      popperContainer={CalendarContainer}
      customInput={
        <div className="col-span-6 sm:col-span-3">
          <div className="flex justify-between">
            <FormLabel label={label} />
          </div>
          <div className="mt-1">
            <DatePickerSelectButton
              text={
                selected ? format(new Date(selected), 'dd/MM/yyyy') : 'None'
              }
              name={name}
            />
          </div>
        </div>
      }
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-lg text-gray-700">
            {format(date, 'MMMM yyyy')}
          </span>

          <div className="space-x-2">
            <ChevronLeftButton
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={`${
                prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
              } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500`}
            />
            <ChevronRightButton
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={`${
                nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
              }inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500`}
            />
          </div>
        </div>
      )}
    />
  );
};

export default DatePickerNoClear;
