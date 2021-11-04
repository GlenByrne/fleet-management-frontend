import { useReactiveVar } from '@apollo/client';
import { updateTollTagAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateTollTagAlert = () => {
  const alertState = useReactiveVar(updateTollTagAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateTollTagAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateTollTagAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Toll Tag updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateTollTagAlert;
