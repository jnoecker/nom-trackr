import axios from 'axios';

const LogoutButton = ({ user, setUser }) => {
  const logout = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/users/logout',
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        setUser(undefined);
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.log('error', 'Error logging out');
    }
  };

  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={logout}>Login</button>
  );
};

export default LogoutButton;
