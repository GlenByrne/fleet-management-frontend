import { useReactiveVar } from '@apollo/client';
import { updateVehicleThirteenWeekAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateVehicleThirteenWeekAlert = () => {
  const alertState = useReactiveVar(updateVehicleThirteenWeekAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateVehicleThirteenWeekAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateVehicleThirteenWeekAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Vehicle thirteen week inspection date updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateVehicleThirteenWeekAlert;
