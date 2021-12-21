import { ReactNode } from 'react';
import PasswordSettingsTemplate from '@/components/templates/PasswordSettingsTemplate';

type PasswordSettingsProps = {
  children: ReactNode;
};

const PasswordSettingsPage = ({ children }: PasswordSettingsProps) => {
  return <PasswordSettingsTemplate>{children}</PasswordSettingsTemplate>;
};

export default PasswordSettingsPage;
