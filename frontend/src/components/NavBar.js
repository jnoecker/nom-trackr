import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogInOutButton from './LogInOutButton';
import InviteFriend from './InviteFriend';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = ({ user, setUser }) => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="mb-5">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Nom Trackr</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {user && user.role === 'admin' && (
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <ButtonToolbar>
            <ButtonGroup className="me-2">
              {user && <InviteFriend />}
            </ButtonGroup>
            <ButtonGroup className="me-2">
              <LogInOutButton user={user} setUser={setUser} />
            </ButtonGroup>
          </ButtonToolbar>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
