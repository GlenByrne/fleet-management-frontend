import { ReactNode, useEffect, useState } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
};

function ClientOnly({ children, ...delegated }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;
