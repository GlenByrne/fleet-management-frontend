import { Fragment, SetStateAction, useMemo, useRef, useState } from 'react';
import { Listbox, Portal, Transition } from '@headlessui/react';
import { usePopper, Modifier } from 'react-popper';
import { Option } from '@/constants/types';
import SelectLabel from '@/components/atoms/SelectLabel';
import SelectButton from '@/components/atoms/SelectButton';
import SelectOption from '@/components/atoms/SelectOption';

type ModalFormSelectProps = {
  label: string;
  name: string;
  options: Option[];
  selected: Option;
  onChange: (value: SetStateAction<Option>) => void;
};

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
      <SelectLabel htmlFor={name} label={label} />
      <div className="relative mt-1" ref={setTargetElement}>
        <SelectButton selected={selected} />

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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <SelectOption key={option.value} option={option} />
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
