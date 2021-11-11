import { useReactiveVar } from '@apollo/client';
import { deleteDefectAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const DeleteDefectAlert = () => {
  const alertState = useReactiveVar(deleteDefectAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        deleteDefectAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={deleteDefectAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Defect deleted successfully
      </p>
    </SuccessNotification>
  );
};

export default DeleteDefectAlert;
