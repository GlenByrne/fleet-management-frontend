import client from 'constants/apollo-client';
import Router from 'next/router';

export const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    Router.push('/login');
  }
};

export const logOut = () => {
  localStorage.removeItem('token');
  Router.push('/login');
  client.clearStore();
};

// export const login = ({token, token_expiry}, noRedirect) {

// }
