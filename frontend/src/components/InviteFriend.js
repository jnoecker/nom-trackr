import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';

const InviteFriend = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);

  const handleChangeName = ({ target }) => {
    setName(target.value);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInviteFriend = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users/inviteFriend',
        withCredentials: true,
        data: {
          name,
          email,
        },
      });

      if (res.data.status === 'success') {
        toast.success('Invitation Successful');
        handleHide();
      } else {
      }
    } catch (error) {
      toast.error('Failed to invite friend');
    }
  };

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Invite Friend
        </Button>
      </div>
      <Modal show={show} onHide={handleHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Invite a Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="friendName">
              <Form.Label>Your Friend's Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={handleChangeName}
              />
              <Form.Text className="text-muted">
                Enter the name of the friend you want to invite to NomTrackr.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="friendEmail">
              <Form.Label>Friend's Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={handleChangeEmail}
              />
              <Form.Text className="text-muted">
                Your friend will receive an email at this address with login
                details.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleInviteFriend}>
            Invite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InviteFriend;
