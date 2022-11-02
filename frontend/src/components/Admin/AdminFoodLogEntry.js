import axios from 'axios';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import AdminEditFood from './AdminEditFood';

const AdminFoodLogEntry = ({ food, allFoods, setAllFoods }) => {
  const { createdBy, consumedAt, _id, name, calories } = food;
  const handleDelete = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/v1/foods/admin/${_id}`,
        withCredentials: true,
      });

      setAllFoods(
        allFoods.filter((one) => {
          console.log(one);
          return one._id !== _id;
        })
      );
    } catch (error) {
      // Handle error
    }
  };
  return (
    <>
      <th>{_id}</th>
      <th>{createdBy}</th>
      <th>{moment(consumedAt).format('YYYY-MM-DD hh:mm a')}</th>
      <th className="text-capitalize">{name}</th>
      <th>{calories}</th>
      <th>
        <AdminEditFood
          food={food}
          allFoods={allFoods}
          setAllFoods={setAllFoods}
        />
      </th>
      <th>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </th>
    </>
  );
};

export default AdminFoodLogEntry;
