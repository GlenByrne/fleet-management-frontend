import { useReactiveVar } from '@apollo/client';
import { logoutAlertVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const LogoutAlert = () => {
  const alertState = useReactiveVar(logoutAlertVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        logoutAlertVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification alertState={alertState} setAlertState={logoutAlertVar}>
      <p className="text-sm font-medium text-gray-900">
        Logged out successfully
      </p>
    </SuccessNotification>
  );
};

export default LogoutAlert;
