import { MouseEventHandler } from "react";
import { Button, Modal } from "react-bootstrap";

interface TaskDeleteConfirmationModalProps {
  show: boolean;
  onClose: MouseEventHandler;
  onSuccess: MouseEventHandler;
}

const TaskDeleteConfirmationModal = (
  props: TaskDeleteConfirmationModalProps
) => {
  return (
    <Modal show={props.show}>
      <Modal.Body>
        <p>Are you sure to delete the task?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={props.onSuccess}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDeleteConfirmationModal;
