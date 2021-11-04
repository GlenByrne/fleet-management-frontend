import { useReactiveVar } from '@apollo/client';
import { createDepotAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const CreateDepotAlert = () => {
  const alertState = useReactiveVar(createDepotAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        createDepotAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={createDepotAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Depot added successfully
      </p>
    </SuccessNotification>
  );
};

export default CreateDepotAlert;
