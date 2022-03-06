import { Col, Row } from "react-bootstrap";
import TaskDate from "./components/TaskDate";
import TaskDetails from "./components/TaskDetails";
import "./index.scss";
import NoTaskFound from "./components/NoTaskFound";
import * as DB from "../../helpers/db";
import { Task } from "../../types/common";
import { Link } from "react-router-dom";

interface FormattedTaskList {
  timestamp: number;
  taskList: Array<Task>;
}

const formatList = (list: Array<Task>) => {
  // group a tasks by date
  const formattedList = list.reduce(
    (accum: Array<FormattedTaskList>, value: Task) => {
      // this is a timestamp value
      const expiresOnTimestamp = new Date(value.expiresOn).getTime();
      const taskIndex = accum.findIndex(
        (value: FormattedTaskList) => value.timestamp === expiresOnTimestamp
      );
      if (taskIndex === -1) {
        accum.push({
          timestamp: expiresOnTimestamp,
          taskList: [value],
        });
      } else {
        accum[taskIndex].taskList.push(value);
      }
      return accum;
    },
    []
  );
  return formattedList.sort(
    (a: FormattedTaskList, b: FormattedTaskList) => a.timestamp - b.timestamp
  );
};

const TaskList = () => {
  const list = formatList(DB.getItems());
  return (
    <>
      {list.length === 0 ? (
        <NoTaskFound />
      ) : (
        list.map((value: FormattedTaskList) => {
          return (
            <Row key={value.timestamp.toString()} className="mb-3">
              <Col xs={3}>
                <TaskDate
                  containerClassName="task-list-container__date-container-spacing m-0"
                  timestamp={value.timestamp}
                ></TaskDate>
              </Col>
              <Col xs={9}>
                {value.taskList.map((task: Task) => {
                  return (
                    <Row
                      data-testid="task"
                      key={task.id.toString()}
                      className="mb-2"
                    >
                      <Col xs={12} className="ps-0">
                        <Link to={`/tasks/${task.id}`}>
                          <TaskDetails
                            details={task}
                            containerClassName="m-0"
                          ></TaskDetails>
                        </Link>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          );
        })
      )}
    </>
  );
};

export default TaskList;
