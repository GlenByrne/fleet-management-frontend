import { SetStateAction } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import CalendarContainer from '../../atoms/CalendarContainer';
import XButton from '@/components/atoms/Button/XButton';
import InputLabel from '@/components/atoms/InputLabel';
import ChevronLeftButton from '@/components/atoms/Button/ChevronLeftButton';
import ChevronRightButton from '@/components/atoms/Button/ChevronRightButton';
import DatePickerSelectButton from '@/components/atoms/Button/DatePickerSelectButton';
type DatePickProps = {
  label: string;
  name: string;
  selected: Date | null;
  required: boolean;
  onChange: (value: SetStateAction<Date | null>) => void;
};

const DatePicker = ({
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
      isClearable={true}
      placeholderText="None"
      nextMonthButtonLabel=">"
      previousMonthButtonLabel="<"
      popperContainer={CalendarContainer}
      customInput={
        <div className="col-span-6 sm:col-span-3">
          <div className="flex justify-between">
            <InputLabel label={label} htmlFor={name} />
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
        <div className="flex items-center justify-between px-1 py-1">
          <span className="text-lg text-gray-700">
            {format(date, 'MMMM yyyy')}
          </span>

          <div className="space-x-2">
            <XButton onClick={() => onChange(null)} />
            <ChevronLeftButton
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={`${
                prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
              } inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0`}
            />
            <ChevronRightButton
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={`${
                nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
              }inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0`}
            />
          </div>
        </div>
      )}
    />
  );
};

export default DatePicker;
