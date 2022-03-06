import classNames from "classnames";
import { Col, Row } from "react-bootstrap";
import { formatDate } from "../../../../helpers/date";
import "./index.scss";

interface TaskDateProps {
  containerClassName?: string;
  timestamp: number;
}

const TaskDate = (props: TaskDateProps) => {
  const containerClasses = ["task-date-container"];
  if (props.containerClassName) {
    containerClasses.push(props.containerClassName);
  }
  const date = new Date(props.timestamp);

  return (
    <Row className={classNames(containerClasses)}>
      <Col>
        <span className="d-flex justify-content-center">{date.getDate()}</span>
        <span className="d-flex justify-content-center">
          {formatDate(date, "MM")}
        </span>
      </Col>
    </Row>
  );
};

export default TaskDate;
