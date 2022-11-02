const FoodLogEntry = ({ consumedAt, foodName, calories }) => {
  return (
    <p>
      {consumedAt.replace(/T.*/, '')} {foodName} {calories}
    </p>
  );
};

export default FoodLogEntry;
