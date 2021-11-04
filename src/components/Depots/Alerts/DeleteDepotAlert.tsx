import { useReactiveVar } from '@apollo/client';
import { deleteDepotAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const DeleteDepotAlert = () => {
  const alertState = useReactiveVar(deleteDepotAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        deleteDepotAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={deleteDepotAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Depot deleted successfully
      </p>
    </SuccessNotification>
  );
};

export default DeleteDepotAlert;
