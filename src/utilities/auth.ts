import client, { loggedInUserVar } from 'constants/apollo-client';
import Router from 'next/router';

export const checkAuth = () => {
  const token = localStorage.getItem('token');
  return Boolean(token);
};

export const logOut = () => {
  localStorage.removeItem('token');
  loggedInUserVar(null);
  Router.push('/login');
  client.clearStore();
};
