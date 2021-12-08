import { Portal } from '@headlessui/react';
import { ReactNode } from 'react';
import { useRef } from 'react';

type CalendarContainerProps = {
  children: ReactNode;
};

const CalendarContainer = ({ children }: CalendarContainerProps) => {
  const popperElRef = useRef(null);

  return (
    <Portal>
      <div ref={popperElRef}>{children}</div>
    </Portal>
  );
};

export default CalendarContainer;
