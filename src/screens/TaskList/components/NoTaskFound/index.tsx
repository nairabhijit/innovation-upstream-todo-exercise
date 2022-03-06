import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as DB from "../../../../helpers/db";
import sampleValues from "../../../../helpers/sample-values.json";

const NoTaskFound = () => {
  const onLoadSampleValues = () => {
    DB.setItems(sampleValues);
    window.location.reload();
  };

  return (
    <Row data-testid="no-tasks-list">
      <Col xs={12}>
        <Row className="justify-content-center">
          <Col className="col-auto">
            <h3>No task list to display!!!</h3>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row className="justify-content-center">
          <Col className="col-auto">
            <Link to="/tasks/add">
              <Button variant="outline-primary">Add New Task</Button>
            </Link>
          </Col>
          <Col className="col-auto ps-0">
            <Button variant="outline-primary" onClick={onLoadSampleValues}>
              Load Sample Values
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NoTaskFound;
