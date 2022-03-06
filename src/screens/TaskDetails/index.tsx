import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../helpers/date";
import * as DB from "../../helpers/db";
import { Task } from "../../types/common";
import TaskDeleteConfirmationModal from "./components/TaskDeleteConfirmationModal";

const TaskDetails = () => {
  const [showDeleteModal, setDeleteModalVisibility] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const onDelete = () => {
    if (params.taskId) {
      const taskId = parseInt(params.taskId);
      // delete the item from DB
      DB.removeItem(taskId);
      // redirect to the task list
      navigate("/");
    }
  };

  let task: Task | null = null;
  if (params.taskId) {
    task = DB.getItem(parseInt(params.taskId));
  }

  return task ? (
    <>
      <Row>
        <Col>
          <p className="mb-0">
            <strong>Title</strong>
          </p>
          <p>{task.title}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mb-0">
            <strong>Description</strong>
          </p>
          {task.description ? (
            <p>{task.description}</p>
          ) : (
            <p className="fst-italic">No description</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mb-0">
            <strong>Expires On</strong>
          </p>
          <p>{formatDate(new Date(task.expiresOn), "mm/dd/yyyy")}</p>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col className="col-auto pe-0">
          <Link to="/">
            <Button
              variant="outline-secondary"
              data-testid="submit-btn"
              type="submit"
              className="btn--fixed-width"
            >
              Cancel
            </Button>
          </Link>
        </Col>
        <Col className="col-auto pe-0">
          <Link to={`/tasks/${params.taskId}/edit`}>
            <Button
              variant="primary"
              data-testid="submit-btn"
              type="submit"
              className="btn--fixed-width"
            >
              Edit
            </Button>
          </Link>
        </Col>
        <Col className="col-auto">
          <Button
            variant="danger"
            data-testid="submit-btn"
            type="submit"
            className="btn--fixed-width"
            onClick={() => setDeleteModalVisibility(true)}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <TaskDeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setDeleteModalVisibility(false)}
        onSuccess={onDelete}
      />
    </>
  ) : null;
};

export default TaskDetails;
