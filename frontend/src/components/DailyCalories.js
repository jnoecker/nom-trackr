import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

const DailyCalories = ({ user, myFoods }) => {
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
      // TODO: AlertError
      alert('Failed to load daily calories');
      // Handle error
    }
  };

  useEffect(() => {
    getData();
  }, [myFoods]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Calories</th>
          </tr>
        </thead>
        <tbody>
          {dailyCalories.map((day) => {
            return (
              <tr key={day._id}>
                <th>{day._id}</th>
                <th>
                  {day.count}{' '}
                  {day.count <= user?.dailyCalorieLimit ? (
                    ''
                  ) : (
                    <Badge pill bg="danger">
                      High
                    </Badge>
                  )}
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default DailyCalories;
