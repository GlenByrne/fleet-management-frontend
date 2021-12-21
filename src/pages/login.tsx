import { accessTokenVar } from '@/constants/apollo-client';
import Loading from '@/components/atoms/Loading';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useState } from 'react';
import AlreadyLoggedIn from '@/components/organisms/Login/AlreadyLoggedIn';
import LoginForm from '@/components/organisms/Login/LoginForm';

const Login: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = accessTokenVar();

    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [accessTokenVar]);

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
