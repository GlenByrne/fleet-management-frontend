import { SetStateAction } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/solid';
import CalendarContainer from '../../../core/CalendarContainer';
import FormLabel from '@/components/Atomic/atoms/FormLabel';
import DatePickerSelectButton from '@/components/Atomic/atoms/DatePickerSelectButton';
import XButton from '@/components/Atomic/atoms/XButton';
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
        <div className="flex items-center justify-between px-1 py-1">
          <span className="text-lg text-gray-700">
            {format(date, 'MMMM yyyy')}
          </span>

          <div className="space-x-2">
            <XButton onClick={() => onChange(null)} />

            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              'cursor-not-allowed opacity-50'
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500
                                        `}
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className={`
                  ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                    inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500
                    `}
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default DatePicker;
