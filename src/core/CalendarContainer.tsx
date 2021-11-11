import { Portal } from '@headlessui/react';
import { ReactNode } from 'markdown-to-jsx/node_modules/@types/react';
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
