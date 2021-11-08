import { useReactiveVar } from '@apollo/client';
import { updateVehicleCVRTAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateVehicleCVRTAlert = () => {
  const alertState = useReactiveVar(updateVehicleCVRTAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateVehicleCVRTAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateVehicleCVRTAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Vehicle CVRT date updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateVehicleCVRTAlert;
