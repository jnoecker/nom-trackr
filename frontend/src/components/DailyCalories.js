import { useState, useEffect } from 'react';
import axios from 'axios';

const DailyCalories = () => {
  const [dailyCalories, setDailyCalories] = useState([]);

  const getData = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/foods/stats',
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        console.log(res.data.data);
        const data = res.data.data;
        setDailyCalories(data.caloriesPerDay);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    getData();
  };

  return (
    <div>
      <button onClick={handleClick}>Get Daily Calories</button>
      <ul>
        {dailyCalories.map((day) => {
          return (
            <li key={day._id}>
              {day._id} {day.count}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyCalories;
