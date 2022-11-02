import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import AdminFoodLogEntry from './AdminFoodLogEntry';

const AdminFoodLog = () => {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [allFoods, setAllFoods] = useState([]);

  const handleChangeStartDate = ({ target }) => {
    setStartDate(target.value);
  };

  const handleChangeEndDate = ({ target }) => {
    setEndDate(target.value);
  };

  const getData = async () => {
    console.log('getData()');
    const startSearch = new Date(moment(startDate));
    const endSearch = new Date(moment(endDate));
    endSearch.setDate(endSearch.getDate() + 1);
    console.log('Start Date ' + startSearch);
    console.log('End Date: ' + endSearch);
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/foods/admin',
        withCredentials: true,
        params: {
          'consumedAt[gte]': startSearch,
          'consumedAt[lt]': endSearch,
        },
      });

      console.log(res.data.data);
      setAllFoods(res.data.data);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmitDates = async (event) => {
    event.preventDefault();
    getData();
  };

  return (
    <div>
      <form>
        <input type="date" value={startDate} onChange={handleChangeStartDate} />
        <input type="date" value={endDate} onChange={handleChangeEndDate} />
        <button onClick={handleSubmitDates}>Get All Foods</button>
      </form>
      <h2>All Foods:</h2>
      <ul type="none" style={{ marginBottom: '150px' }}>
        {allFoods.map((food) => (
          <li
            key={food._id}
            style={{
              marginBottom: '5px',
              justifyContent: 'left',
              border: '1px',
            }}
          >
            <AdminFoodLogEntry
              createdBy={food.createdBy}
              consumedAt={food.consumedAt}
              foodName={food.name}
              calories={food.calories}
              foodId={food._id}
              allFoods={allFoods}
              setAllFoods={setAllFoods}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFoodLog;
