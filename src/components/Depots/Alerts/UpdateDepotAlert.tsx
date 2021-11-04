import { useReactiveVar } from '@apollo/client';
import { updateDepotAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateDepotAlert = () => {
  const alertState = useReactiveVar(updateDepotAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateDepotAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateDepotAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Depot updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateDepotAlert;
