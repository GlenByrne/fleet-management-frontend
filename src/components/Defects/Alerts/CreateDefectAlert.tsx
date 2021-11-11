import { useReactiveVar } from '@apollo/client';
import { createDefectAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const CreateDefectAlert = () => {
  const alertState = useReactiveVar(createDefectAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        createDefectAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={createDefectAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Defect added successfully
      </p>
    </SuccessNotification>
  );
};

export default CreateDefectAlert;
