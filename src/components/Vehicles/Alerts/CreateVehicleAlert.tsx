import { useReactiveVar } from '@apollo/client';
import { createVehicleAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const CreateVehicleAlert = () => {
  const alertState = useReactiveVar(createVehicleAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        createVehicleAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={createVehicleAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Vehicle added successfully
      </p>
    </SuccessNotification>
  );
};

export default CreateVehicleAlert;
