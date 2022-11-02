import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const LoginBox = ({ user, setUser }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users/login',
        data: {
          email: userName,
          password,
        },
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        setUser(res.data.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
        handleHide();
        history.go(0);
      }
    } catch (error) {
      // TODO: AlertError
      alert('Failed to Log In');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/users/logout',
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        setUser(undefined);
        localStorage.removeItem('user');
        history.go(0);
      }
    } catch (err) {
      // TODO: AlertError
      alert('Error logging out');
    }
  };

  const handleInputUserName = ({ target }) => {
    setUserName(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <div>
        {user ? (
          <Button variant="primary" className="px-3" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button variant="primary" className="px-3" onClick={handleShow}>
            Log In
          </Button>
        )}
      </div>
      <Modal show={show} onHide={handleHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Log In to NomTrackr</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                value={userName}
                onChange={handleInputUserName}
              />
              <Form.Text className="text-muted">
                Enter your email address
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="friendEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handleInputPassword}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginBox;
