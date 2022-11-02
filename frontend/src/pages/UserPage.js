import '../App.css';
import { useState } from 'react';
import FoodLog from '../components/FoodLog';
import DailyCalories from '../components/DailyCalories';

function UserPage({ user, setUser }) {
  const [myFoods, setMyFoods] = useState([]);
  return (
    <div className="user-page d-flex justify-content-center">
      <div className="food-log">
        <h1 className="text-center mb-3">View My Foods</h1>
        <FoodLog user={user} myFoods={myFoods} setMyFoods={setMyFoods} />
        <h1 className="text-center mb-3">My Daily Calories</h1>
        <DailyCalories user={user} myFoods={myFoods} />
      </div>
    </div>
  );
}
export default UserPage;
