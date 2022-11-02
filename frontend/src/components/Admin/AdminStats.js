import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStats = () => {
  const [thisWeekFoods, setThisWeekFoods] = useState(0);
  const [thisWeekCalories, setThisWeekCalories] = useState(0);
  const [thisWeekUsers, setThisWeekUsers] = useState(1);

  const [lastWeekFoods, setLastWeekFoods] = useState(0);
  const [lastWeekCalories, setLastWeekCalories] = useState(0);
  const [lastWeekUsers, setLastWeekUsers] = useState(1);

  const getData = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/foods/admin/stats',
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        const data = res.data.data;
        setThisWeekFoods(data.currentWeekFoodStats[0].totalFoodsAdded);
        setThisWeekCalories(data.currentWeekFoodStats[0].totalCaloriesAdded);
        setThisWeekUsers(data.currentWeekActiveUsers[0].count);

        setLastWeekFoods(data.previousWeekFoodStats[0].totalFoodsAdded);
        setLastWeekCalories(data.previousWeekFoodStats[0].totalCaloriesAdded);
        setLastWeekUsers(data.previousWeekActiveUsers[0].count);
      }
    } catch (error) {
      // Handle error
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <p className="text-center">
        This Week: {thisWeekUsers} users added {thisWeekFoods} foods. Total
        Calories: {thisWeekCalories} (Average:{' '}
        {thisWeekCalories / thisWeekUsers} calories per user)
      </p>
      <p className="text-center">
        This Week: {lastWeekUsers} users added {lastWeekFoods} foods. Total
        Calories: {lastWeekCalories} (Average:{' '}
        {lastWeekCalories / lastWeekUsers} calories per user)
      </p>
    </>
  );
};

export default AdminStats;
