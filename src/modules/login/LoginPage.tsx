import React, { useEffect, useState } from 'react';
import Loading from '@/components/atoms/Loading';
import { getAccessToken } from '@/pages/_app';
import AlreadyLoggedIn from './AlreadyLoggedIn';
import LoginForm from './LoginForm';

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = getAccessToken();

    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return loggedIn ? <AlreadyLoggedIn /> : <LoginForm />;
}

export default LoginPage;
