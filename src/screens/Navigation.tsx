import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import * as DB from '../helpers/db';

const Navigation = () => {
  const location = useLocation();
  const onClear = () => {
    DB.clearItems();
    window.location.href = "/";
  }
  return (
    <Navbar bg="primary" variant="dark" sticky="top" className="mb-3">
      <Container>
        <Nav activeKey={location.pathname} className="me-auto">
          <Nav.Link eventKey="/" as={Link} to="/">
            Task List
          </Nav.Link>
          <Nav.Link eventKey="/tasks/add" as={Link} to="/tasks/add">
            Add New Task
          </Nav.Link>
        </Nav>
        <div onClick={onClear} role="button" className="text-white">
          Clear All
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
