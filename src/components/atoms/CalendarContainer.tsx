import { Portal } from '@headlessui/react';
import { ReactNode, useRef } from 'react';

type CalendarContainerProps = {
  children: ReactNode;
};

function CalendarContainer({ children }: CalendarContainerProps) {
  const popperElRef = useRef(null);

  return (
    <Portal>
      <div ref={popperElRef}>{children}</div>
    </Portal>
  );
}

export default CalendarContainer;
