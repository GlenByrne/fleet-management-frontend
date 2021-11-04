import { useReactiveVar } from '@apollo/client';
import { createTollTagAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const CreateTollTagAlert = () => {
  const alertState = useReactiveVar(createTollTagAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        createTollTagAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={createTollTagAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Toll Tag added successfully
      </p>
    </SuccessNotification>
  );
};

export default CreateTollTagAlert;
