import { useReactiveVar } from '@apollo/client';
import { authTimeoutAlertVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const AuthTimeoutAlert = () => {
  const alertState = useReactiveVar(authTimeoutAlertVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        authTimeoutAlertVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={authTimeoutAlertVar}
    >
      <p className="text-sm font-medium text-gray-900">
        You have been logged out due to your login credentials expiring. Please
        log back in
      </p>
    </SuccessNotification>
  );
};

export default AuthTimeoutAlert;
