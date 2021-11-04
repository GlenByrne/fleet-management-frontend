import { useReactiveVar } from '@apollo/client';
import { deleteVehicleAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const DeleteVehicleAlert = () => {
  const alertState = useReactiveVar(deleteVehicleAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        deleteVehicleAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={deleteVehicleAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Vehicle deleted successfully
      </p>
    </SuccessNotification>
  );
};

export default DeleteVehicleAlert;
