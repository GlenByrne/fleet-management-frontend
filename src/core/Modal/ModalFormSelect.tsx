import { Fragment, SetStateAction, useMemo, useRef, useState } from 'react';
import { Option } from 'constants/types';
import { Listbox, Portal, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { usePopper, Modifier } from 'react-popper';

type ModalFormSelectProps = {
  label: string;
  name: string;
  options: Option[];
  selected: Option;
  onChange: (value: SetStateAction<Option>) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const ModalFormSelect = ({
  label,
  name,
  options,
  selected,
  onChange,
}: ModalFormSelectProps) => {
  const popperElRef = useRef(null);
  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const modifiers = useMemo(
    (): Modifier<string, Record<string, unknown>>[] => [
      {
        name: 'matchReferenceSize',
        enabled: true,
        fn: ({ state, instance }) => {
          const widthOrHeight =
            state.placement.startsWith('left') ||
            state.placement.startsWith('right')
              ? 'height'
              : 'width';

          if (!popperElement) return;

          const popperSize =
            popperElement[
              `offset${
                widthOrHeight[0].toUpperCase() + widthOrHeight.slice(1)
              }` as 'offsetWidth'
            ];
          const referenceSize = state.rects.reference[widthOrHeight];

          if (Math.round(popperSize) === Math.round(referenceSize)) return;

          popperElement.style[widthOrHeight] = `${referenceSize}px`;
          instance.update();
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      },
    ],
    [popperElement]
  );

  const { styles, attributes } = usePopper(targetElement, popperElement, {
    modifiers,
  });

  return (
    <Listbox value={selected} onChange={onChange}>
      <Listbox.Label
        className="block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </Listbox.Label>
      <div className="mt-1 relative" ref={setTargetElement}>
        <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            {selected.label == '' ? 'None' : selected.label}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Portal>
          <div
            className="w-full max-w-xs"
            ref={popperElRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              beforeEnter={() => setPopperElement(popperElRef.current)}
              afterLeave={() => setPopperElement(null)}
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
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
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Portal>
      </div>
    </Listbox>
  );
};

export default ModalFormSelect;
