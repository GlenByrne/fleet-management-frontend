import Loading from '@/components/atoms/Loading';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useState } from 'react';
import AlreadyLoggedIn from 'src/features/login/AlreadyLoggedIn';
import LoginForm from '@/components/organisms/Login/LoginForm';
import { getAccessToken } from './_app';

const Login: NextPage = () => {
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

  return loggedIn ? (
    <AlreadyLoggedIn />
  ) : (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
