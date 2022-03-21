import { useRef } from 'react';
import Modal from '@/components/atoms/Modal';
import AddFuelCardForm from './AddFuelCardForm';

type CreateFuelCardModalProps = {
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

function CreateFuelCardModal({
  modalState,
  changeModalState,
}: CreateFuelCardModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <AddFuelCardForm
        changeModalState={changeModalState}
        cancelButtonRef={cancelButtonRef}
      />
    </Modal>
  );
}

export default CreateFuelCardModal;
