import { NextPage } from 'next';
import LoginForm from 'components/Login/LoginForm';
import AlreadyLoggedIn from 'components/Login/AlreadyLoggedIn';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from 'core/Loading';
import { checkAuth } from 'utilities/auth';
import { accessTokenVar } from 'constants/apollo-client';

const Login: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const isLoggedIn = accessTokenVar();

  //   if (isLoggedIn) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  //   setLoading(false);
  //   // eslint-disable-next-line
  // }, [accessTokenVar]);

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
