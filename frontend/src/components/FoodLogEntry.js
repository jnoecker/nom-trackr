import moment from 'moment';
const FoodLogEntry = ({ consumedAt, foodName, calories }) => {
  return (
    <>
      <th>{moment(consumedAt).format('YYYY-MM-DD hh:mm a')}</th>
      <th className="text-capitalize">{foodName}</th>
      <th>{calories}</th>
    </>
  );
};

export default FoodLogEntry;
