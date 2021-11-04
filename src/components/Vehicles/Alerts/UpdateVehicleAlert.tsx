import { useReactiveVar } from '@apollo/client';
import { updateVehicleAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateVehicleAlert = () => {
  const alertState = useReactiveVar(updateVehicleAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateVehicleAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateVehicleAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Vehicle updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateVehicleAlert;
