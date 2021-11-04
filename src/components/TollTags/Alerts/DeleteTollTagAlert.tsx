import { useReactiveVar } from '@apollo/client';
import { deleteTollTagAlertStateVar } from 'constants/apollo-client';
import SuccessNotification from 'core/Alerts/SuccessNotification';
import { useEffect } from 'react';

const DeleteTollTagAlert = () => {
  const alertState = useReactiveVar(deleteTollTagAlertStateVar);

  useEffect(() => {
    if (alertState === true) {
      setTimeout(() => {
        deleteTollTagAlertStateVar(false);
      }, 3000);
    }
  });

  return (
    <SuccessNotification
      alertState={alertState}
      setAlertState={deleteTollTagAlertStateVar}
    >
      <p className="text-sm font-medium text-gray-900">
        Toll Tag deleted successfully
      </p>
    </SuccessNotification>
  );
};

export default DeleteTollTagAlert;
