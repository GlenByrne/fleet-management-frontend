import { NextPage } from 'next';
import LoginForm from 'components/Login/LoginForm';
import AlreadyLoggedIn from 'components/Login/AlreadyLoggedIn';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from 'core/Loading';

const Login: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
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
};

export default Login;
