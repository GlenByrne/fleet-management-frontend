import { useReactiveVar } from '@apollo/client';
import { updateVehicleTachoCalibrationAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateVehicleTachoCalibrationAlert = () => {
  const alertState = useReactiveVar(updateVehicleTachoCalibrationAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateVehicleTachoCalibrationAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateVehicleTachoCalibrationAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Vehicle tacho calibration date updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateVehicleTachoCalibrationAlert;
