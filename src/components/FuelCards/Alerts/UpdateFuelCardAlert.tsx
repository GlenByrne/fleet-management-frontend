import { useReactiveVar } from '@apollo/client';
import { updateFuelCardAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateFuelCardAlert = () => {
  const alertState = useReactiveVar(updateFuelCardAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateFuelCardAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateFuelCardAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Fuel Card updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateFuelCardAlert;
