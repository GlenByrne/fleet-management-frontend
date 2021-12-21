import { ReactNode } from 'react';
import AccountSettingsTemplate from '@/components/templates/AccountSettingsTemplate';

type AccountSettingsProps = {
  children: ReactNode;
};

const AccountSettingsPage = ({ children }: AccountSettingsProps) => {
  return <AccountSettingsTemplate>{children}</AccountSettingsTemplate>;
};

export default AccountSettingsPage;
