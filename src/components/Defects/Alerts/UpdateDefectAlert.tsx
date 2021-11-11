import { useReactiveVar } from '@apollo/client';
import { updateDefectAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const UpdateDefectAlert = () => {
  const alertState = useReactiveVar(updateDefectAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        updateDefectAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={updateDefectAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Defect updated successfully
      </p>
    </SuccessNotification>
  );
};

export default UpdateDefectAlert;
