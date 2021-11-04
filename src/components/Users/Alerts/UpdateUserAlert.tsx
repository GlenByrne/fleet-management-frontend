import { useReactiveVar } from '@apollo/client';
import { updateUserAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateUserAlert = () => {
  const alertState = useReactiveVar(updateUserAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateUserAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateUserAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        User updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateUserAlert;
