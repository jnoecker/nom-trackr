import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AlertError = ({ message }) => {
  const [show, setShow] = useState();

  return (
    <ToastContainer position="top-center">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg="danger"
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AlertError;
