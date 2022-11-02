import axios from 'axios';

const AdminFoodLogEntry = ({
  createdBy,
  consumedAt,
  foodId,
  foodName,
  calories,
  allFoods,
  setAllFoods,
}) => {
  const handleDelete = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/v1/foods/admin/${foodId}`,
        withCredentials: true,
      });

      setAllFoods(
        allFoods.filter((food) => {
          console.log(food);
          return food._id !== foodId;
        })
      );
    } catch (error) {
      // Handle error
    }
  };
  return (
    <p>
      {foodId} {createdBy} {consumedAt.replace(/T.*/, '')} {foodName} {calories}{' '}
      <button onClick={handleDelete}>Delete</button>
    </p>
  );
};

export default AdminFoodLogEntry;
