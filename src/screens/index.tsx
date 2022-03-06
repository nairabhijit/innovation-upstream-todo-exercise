import { Col, Container, Row } from "react-bootstrap";
import Router from "./Router";

const Screens = () => {
  return (
    <Container className="task-list-container">
      <Row className="pt-5 justify-content-center">
        <Col xs={12} lg={4}>
          <Router />
        </Col>
      </Row>
    </Container>
  );
};

export default Screens;
