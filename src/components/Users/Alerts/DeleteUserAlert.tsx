import { useReactiveVar } from '@apollo/client';
import { deleteUserAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const DeleteUserAlert = () => {
  const alertState = useReactiveVar(deleteUserAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        deleteUserAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={deleteUserAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        User deleted successfully
      </p>
    </SuccessNotification>
  );
};

export default DeleteUserAlert;
