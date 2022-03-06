import classNames from "classnames";
import { Col, Row } from "react-bootstrap";
import { Task } from "../../../../types/common";
import "./index.scss";

interface TaskDetailsProps {
  containerClassName?: string;
  details: Task;
}

const TaskDetails = (props: TaskDetailsProps) => {
  const containerClasses = ["task-details"];
  // add relevant css class as per the behaviour
  // task-details--danger - for task already expired
  // task-details--warning - for task about to expire
  const currentTimestamp = new Date().getTime();
  const expiresOnTimestamp = new Date(props.details.expiresOn).getTime();
  // convert the reminder days into timestamp
  const reminderDaysTimestamp = new Date(
    Date.now() + 3600 * 1000 * 24 * props.details.reminderDaysInAdvance
  ).getTime();

  if (expiresOnTimestamp < currentTimestamp) {
    // expired
    containerClasses.push("task-details--alert");
    containerClasses.push("task-details--danger");
  } else if (
    expiresOnTimestamp - currentTimestamp <
    reminderDaysTimestamp - currentTimestamp
  ) {
    // about to expire
    containerClasses.push("task-details--alert");
    containerClasses.push("task-details--warning");
  }
  if (props.containerClassName) {
    containerClasses.push(props.containerClassName);
  }

  return (
    <Row className={classNames(containerClasses)}>
      <Col xs={12} className="task-details__title">
        {props.details.title}
      </Col>
      <Col xs={12} className="task-details__description">
        {props.details.description ? (
          <span>{props.details.description}</span>
        ) : (
          <span className="fst-italic">No description</span>
        )}
      </Col>
    </Row>
  );
};

export default TaskDetails;
