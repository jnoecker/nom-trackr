import '../App.css';
import Badge from 'react-bootstrap/Badge';

function AccessDeniedPage() {
  return (
    <div className="logged-out-page d-flex justify-content-center">
      <div className="logged-out">
        <h1 className="text-center mb-5">
          <Badge bg="danger">Access Denied</Badge>
        </h1>
        <h1 className="text-center mb-5">
          You do not have permissions to access the requested resource.
        </h1>
      </div>
    </div>
  );
}
export default AccessDeniedPage;
