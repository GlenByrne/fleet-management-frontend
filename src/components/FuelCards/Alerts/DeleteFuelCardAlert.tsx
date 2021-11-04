import { useReactiveVar } from '@apollo/client';
import { deleteFuelCardAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const DeleteFuelCardAlert = () => {
  const alertState = useReactiveVar(deleteFuelCardAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        deleteFuelCardAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={deleteFuelCardAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Fuel Card deleted successfully
      </p>
    </SuccessNotification>
  );
};

export default DeleteFuelCardAlert;
