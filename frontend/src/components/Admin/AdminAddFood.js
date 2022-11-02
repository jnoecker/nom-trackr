import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';

const AdminAddFood = ({ user, allFoods, setAllFoods }) => {
  const [show, setShow] = useState(false);
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
        const newFood = res.data.data;
        toast.success('Successfully added food');
        setAllFoods([newFood, ...allFoods]);
      } else {
      }
    } catch (error) {
      toast.error('Failed to add food');
    }
    handleHide();
  };

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleShow}>
          Add Food
        </Button>
      </div>
      <Modal show={show} onHide={handleHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>(ADMIN) Add a New Food Entry</Modal.Title>
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
                value={createdBy}
                onChange={handleChangeCreatedBy}
              />
              <Form.Text className="text-muted">
                Enter the User ID for the new food entry. (Current user id is{' '}
                {user._id})
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
                Enter a name for the new food entry.
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
          <Button variant="primary" onClick={handleAddFood}>
            Add Food
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminAddFood;
