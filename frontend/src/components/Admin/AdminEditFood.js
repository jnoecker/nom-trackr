import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const AdminEditFood = () => {
  const [foodId, setFoodId] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [newFoodCalories, setnewFoodCalories] = useState(0);
  const [newFoodDateConsumed, setNewFoodDateConsumed] = useState(
    moment().format('YYYY-MM-DD')
  );

  const handleChangeNewFoodName = ({ target }) => {
    setNewFoodName(target.value);
  };

  const handleChangeNewFoodCalories = ({ target }) => {
    setnewFoodCalories(target.value);
  };

  const handleChangeDate = ({ target }) => {
    setNewFoodDateConsumed(target.value);
  };

  const handleChangeCreatedBy = ({ target }) => {
    setCreatedBy(target.value);
  };

  const handleChangeFoodId = ({ target }) => {
    setFoodId(target.value);
  };

  const handleEditFood = async () => {
    const createdTime = new Date(moment(newFoodDateConsumed));
    createdTime.setHours(12);
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:3000/api/v1/foods/admin/${foodId}`,
        withCredentials: true,
        data: {
          _id: foodId,
          createdBy,
          consumedAt: createdTime,
          name: newFoodName,
          calories: newFoodCalories,
        },
      });

      if (res.data.status === 'success') {
        alert('Successfully edited food');
        console.log('Edited Food');
        console.log(res.data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      alert('Failed to edit food');
    }
  };

  return (
    <form>
      <input
        type="date"
        value={newFoodDateConsumed}
        onChange={handleChangeDate}
      />
      <input
        type="text"
        name="foodId"
        value={foodId}
        onChange={handleChangeFoodId}
      />
      <input
        type="text"
        name="createdBy"
        value={createdBy}
        onChange={handleChangeCreatedBy}
      />
      <input
        type="text"
        name="foodNameToEdit"
        value={newFoodName}
        onChange={handleChangeNewFoodName}
      />
      <input
        type="text"
        name="caloriesToEdit"
        value={newFoodCalories}
        onChange={handleChangeNewFoodCalories}
      />
      <button type="button" onClick={handleEditFood}>
        Edit Food
      </button>
    </form>
  );
};

export default AdminEditFood;
