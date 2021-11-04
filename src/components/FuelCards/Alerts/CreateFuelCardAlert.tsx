import { useReactiveVar } from '@apollo/client';
import { createFuelCardAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const CreateFuelCardAlert = () => {
  const alertState = useReactiveVar(createFuelCardAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        createFuelCardAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={createFuelCardAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Fuel Card added successfully
      </p>
    </SuccessNotification>
  );
};

export default CreateFuelCardAlert;
