import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '@/pages/login';
import { ReactElement } from 'react';
import { MockedProvider as ApolloMockProvider } from '@apollo/client/testing';

const renderWithApollo = (element: ReactElement) => {
  render(element, { wrapper: ApolloMockProvider });
};

describe('Login', () => {
  it('Renders', () => {
    renderWithApollo(<Login />);
  });

  const heading = screen.getByText('Sign in to your account');

  expect(heading).toBeInTheDocument();
});
