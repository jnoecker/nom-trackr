import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';

const AdminEditFood = ({ food, allFoods, setAllFoods }) => {
  const [show, setShow] = useState(false);
  const [foodId, setFoodId] = useState(food._id);
  const [newFoodName, setNewFoodName] = useState(food.name);
  const [createdBy, setCreatedBy] = useState(food.createdBy);
  const [newFoodCalories, setnewFoodCalories] = useState(food.calories);
  const [newFoodDateConsumed, setNewFoodDateConsumed] = useState(
    food.consumedAt.replace(/T.*/, '')
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
        toast.success('Successfully edited food');
        handleHide();

        const newFoods = [...allFoods];
        const index = allFoods.findIndex((food) => food._id === foodId);
        newFoods[index] = res.data.data.data;
        setAllFoods(newFoods);
      } else {
      }
    } catch (error) {
      toast.error('Failed to edit food');
    }
  };

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={handleShow}>
          Edit
        </Button>
      </div>
      <Modal show={show} onHide={handleHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>(ADMIN) Edit Food Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="consumedAt">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newFoodDateConsumed}
                onChange={handleChangeDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createdBy">
              <Form.Label>Created By</Form.Label>
              <Form.Control
                type="text"
                value={foodId}
                onChange={handleChangeFoodId}
              />
              <Form.Text className="text-muted">
                The ID of the food to be edited.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createdBy">
              <Form.Label>Created By</Form.Label>
              <Form.Control
                type="text"
                value={createdBy}
                onChange={handleChangeCreatedBy}
              />
              <Form.Text className="text-muted">
                Update the User ID for the food entry.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="foodNameToAdd">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                value={newFoodName}
                onChange={handleChangeNewFoodName}
              />
              <Form.Text className="text-muted">
                Update the name of the food entry.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="caloriesToAdd">
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type="number"
                value={newFoodCalories}
                onChange={handleChangeNewFoodCalories}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditFood}>
            Save Food
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminEditFood;
