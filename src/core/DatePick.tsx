import { useState, createElement, SetStateAction } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

type DatePickProps = {
  label: string;
  name: string;
  selected: Date;
  required: boolean;
  onChange: (value: SetStateAction<Date>) => void;
  disabled?: boolean;
};

const DatePicker = ({
  label,
  name,
  selected,
  required,
  onChange,
  disabled,
}: DatePickProps) => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={(date: Date) => onChange(date)}
      startDate={selected}
      nextMonthButtonLabel=">"
      previousMonthButtonLabel="<"
      popperClassName="react-datepicker-left"
      customInput={
        <div className="col-span-6 sm:col-span-3">
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <span className="text-sm text-gray-500">
              {required ? '' : 'Optional'}
            </span>
          </div>
          <div className="mt-1">
            <button
              type="button"
              name={name}
              disabled={disabled}
              className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {disabled ? 'N/A' : format(new Date(selected), 'dd/MM/yyyy')}
            </button>
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
