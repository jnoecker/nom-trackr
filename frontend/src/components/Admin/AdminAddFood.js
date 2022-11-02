import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const AdminAddFood = ({ user }) => {
  const [createdBy, setCreatedBy] = useState(user._id);
  const [newFoodName, setNewFoodName] = useState('');
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

  const handleAddFood = async () => {
    const createdTime = new Date(moment(newFoodDateConsumed));
    createdTime.setHours(12);
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/foods/admin',
        withCredentials: true,
        data: {
          createdBy,
          consumedAt: createdTime,
          name: newFoodName,
          calories: newFoodCalories,
        },
      });

      if (res.data.status === 'success') {
        alert('Successfully added food');
        console.log('Added Food');
        console.log(res.data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
      alert('Failed to add food');
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
        name="createdBy"
        value={createdBy}
        onChange={handleChangeCreatedBy}
      />
      <input
        type="text"
        name="foodNameToAdd"
        value={newFoodName}
        onChange={handleChangeNewFoodName}
      />
      <input
        type="text"
        name="caloriesToAdd"
        value={newFoodCalories}
        onChange={handleChangeNewFoodCalories}
      />
      <button type="button" onClick={handleAddFood}>
        Add Food
      </button>
    </form>
  );
};

export default AdminAddFood;
