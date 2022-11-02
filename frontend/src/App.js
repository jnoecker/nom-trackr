import logo from './logo.svg';
import './App.css';
import AutoCompleteBar from './components/AutoCompleteBar';
import LoginBox from './components/LoginBox';
import LogoutButton from './components/LogoutButton';
import FoodLog from './components/FoodLog';
import { useState, useEffect } from 'react';
import AdminFoodLog from './components/Admin/AdminFoodLog';
import AdminStats from './components/Admin/AdminStats';
import AdminAddFood from './components/Admin/AdminAddFood';
import AdminEditFood from './components/Admin/AdminEditFood';
import InviteFriend from './components/InviteFriend';
import DailyCalories from './components/DailyCalories';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className="App">
      <h1>Log In</h1>
      <div>
        {!user && <LoginBox setUser={setUser} />}
        {user && <LogoutButton setUser={setUser} />}
      </div>
      <h1>Add Foods</h1>
      <AutoCompleteBar />
      <h1>My Food Log</h1>
      <FoodLog />
      <h1>My Daily Calories</h1>
      <DailyCalories />
      {user?.role === 'admin' && (
        <div className="admin">
          <h1>Admin Panel:</h1>
          <h1>Admin Add Food</h1>
          <AdminAddFood user={user} />
          <h1>Admin View All Foods</h1>
          <AdminFoodLog />
          <h1>Admin Edit Foods</h1>
          <AdminEditFood />
          <h1>Admin Statistics</h1>
          <AdminStats />
        </div>
      )}
      <h1>Invite a Friend</h1>
      <InviteFriend />
      <h1>Logo</h1>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
