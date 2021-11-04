import { useReactiveVar } from '@apollo/client';
import { createUserAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const CreateUserAlert = () => {
  const alertState = useReactiveVar(createUserAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        createUserAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={createUserAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        User added successfully
      </p>
    </SuccessNotification>
  );
};

export default CreateUserAlert;
