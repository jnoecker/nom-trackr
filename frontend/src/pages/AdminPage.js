import '../App.css';
import AdminFoodLog from '../components/Admin/AdminFoodLog';
import AdminStats from '../components/Admin/AdminStats';
import Badge from 'react-bootstrap/Badge';

function AdminPage({ user, setUser }) {
  return (
    <div className="admin-page d-flex justify-content-center">
      {user?.role === 'admin' && (
        <div className="admin">
          <h1 className="text-center mb-5">
            <Badge bg="danger">Admin</Badge>
          </h1>
          <h1 className="text-center mb-3">Admin Statistics</h1>
          <AdminStats />
          <h1 className="text-center mt-5 mb-3">View All Foods</h1>
          <AdminFoodLog user={user} />
        </div>
      )}
    </div>
  );
}
export default AdminPage;
