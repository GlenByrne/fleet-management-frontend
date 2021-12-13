import { checkAuth } from '@/utilities/auth';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';
import Loading from '../components/Atomic/atoms/Loading';

type PrivateAreaProps = {
  children: ReactNode;
};

const PrivateArea = ({ children }: PrivateAreaProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = checkAuth();

    if (isLoggedIn) {
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [router]);

  return loading ? <Loading /> : <>{children}</>;
};

export default PrivateArea;
