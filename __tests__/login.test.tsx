import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '@/pages/login';

describe('Login', () => {
  render(<Login />);

  const heading = screen.getByText('Sign in to your account');

  expect(heading).toBeInTheDocument();
});
