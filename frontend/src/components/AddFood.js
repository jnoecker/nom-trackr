import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import toast from 'react-hot-toast';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const AutoCompleteBar = ({ myFoods, setMyFoods }) => {
  const MIN_MS_BETWEEN_CALLS = 500;
  const AUTOCOMPLETE_URL = 'https://trackapi.nutritionix.com/v2/search/instant';
  const COMMON_FOOD_URL =
    'https://trackapi.nutritionix.com/v2/natural/nutrients';
  const BRANDED_FOOD_URL = 'https://trackapi.nutritionix.com/v2/search/item';
  const NUTRITIONIX_APP_ID = '634b87f6';
  const NUTRITIONIX_APP_KEY = '3335f87ba5c0fd43e73a08a15c2dc0b4';

  const [showAutoComplete, setShowAutoComplete] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastQueryTime, setLastQueryTime] = useState(Date.now());
  const [timer, setTimer] = useState();
  const [autoSuggestionsCommon, setAutoSuggestionsCommon] = useState([]);
  const [autoSuggestionsBranded, setAutoSuggestionsBranded] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCalories, setnewFoodCalories] = useState(0);
  const [show, setShow] = useState(false);
  const [newFoodDateConsumed, setNewFoodDateConsumed] = useState(
    moment().format('YYYY-MM-DD')
  );

  const handleChange = ({ target }) => {
    clearTimeout(timer);
    hideAutoCompleteOverlay();
    setSearchTerm(target.value);
    if (!searchTerm || searchTerm.length < 3) {
      return;
    }

    showAutoCompleteOverlay();

    const now = Date.now();
    const msSinceLastQuery = now - lastQueryTime;

    if (msSinceLastQuery > 0 || msSinceLastQuery < MIN_MS_BETWEEN_CALLS) {
      setTimer(
        setTimeout(() => {
          getNutritionixResults(searchTerm);
          setLastQueryTime(Date.now());
        }, MIN_MS_BETWEEN_CALLS - msSinceLastQuery)
      );
    } else {
      getNutritionixResults(searchTerm);
      setLastQueryTime(Date.now());
    }
  };

  const handleChangeNewFoodName = ({ target }) => {
    setNewFoodName(target.value);
  };

  const handleChangeNewFoodCalories = ({ target }) => {
    setnewFoodCalories(target.value);
  };

  const getNutritionixResults = async (searchString) => {
    try {
      const res = await axios({
        method: 'GET',
        url: AUTOCOMPLETE_URL,
        headers: {
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_APP_KEY,
        },
        params: {
          query: searchString,
        },
      });

      setAutoSuggestionsCommon(res.data.common);
      setAutoSuggestionsBranded(res.data.branded);
    } catch (error) {
      // Do nothing?
    }
  };

  const handleClickCommon = async ({ target }) => {
    const foodName = target.getAttribute('food-name');
    const foodId = target.getAttribute('food-id');

    hideAutoCompleteOverlay();

    try {
      const res = await axios({
        method: 'POST',
        url: COMMON_FOOD_URL,
        headers: {
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_APP_KEY,
        },
        data: {
          query: foodId,
        },
      });

      const calories = res?.data?.foods[0]?.nf_calories || 0;
      setSearchTerm(foodName);
      setNewFoodName(foodName);
      setnewFoodCalories(calories);
    } catch (error) {
      toast.error('Error fetching nutrition information from database');
    }
  };

  const clearSearch = () => {
    setNewFoodDateConsumed(moment().format('YYYY-MM-DD'));
    setNewFoodName('');
    setnewFoodCalories(0);
    setSearchTerm('');
    setAutoSuggestionsBranded([]);
    setAutoSuggestionsCommon([]);
    hideAutoCompleteOverlay();
  };

  const handleClickBranded = async ({ target }) => {
    const foodName = target.getAttribute('food-name');
    const foodId = target.getAttribute('food-id');

    hideAutoCompleteOverlay();

    try {
      const res = await axios({
        method: 'GET',
        url: BRANDED_FOOD_URL,
        headers: {
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_APP_KEY,
        },
        params: {
          nix_item_id: foodId,
        },
      });

      const calories = res?.data?.foods[0]?.nf_calories || 0;
      setSearchTerm(foodName);
      setNewFoodName(foodName);
      setnewFoodCalories(calories);
    } catch (error) {
      toast.error('Error fetching nutrition information from database');
    }
  };

  const showAutoCompleteOverlay = () => {
    setShowAutoComplete('block');
  };

  const hideAutoCompleteOverlay = () => {
    setShowAutoComplete('none');
  };

  const handleChangeDate = ({ target }) => {
    setNewFoodDateConsumed(target.value);
  };

  const handleShow = () => setShow(true);
  const handleHide = () => {
    setShow(false);
    clearSearch();
  };

  const handleAddFood = async () => {
    const createdTime = new Date(moment(newFoodDateConsumed));
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/foods',
        withCredentials: true,
        data: {
          consumedAt: createdTime,
          name: newFoodName,
          calories: newFoodCalories,
        },
      });

      if (res.data.status === 'success') {
        const newFood = res.data.data;
        toast.success('Successfully added food');
        setMyFoods([newFood, ...myFoods]);
        handleHide();
      } else {
        toast.error('Failed to add food');
      }
    } catch (error) {
      toast.error('Failed to Add Food');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleShow}>
          Add Food
        </Button>
      </div>
      <Modal show={show} onHide={handleHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Food Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group className="mb-3" controlId="consumedAt">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newFoodDateConsumed}
                  onChange={handleChangeDate}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
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
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="caloriesToAdd">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    type="number"
                    value={newFoodCalories}
                    onChange={handleChangeNewFoodCalories}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="autoCompleteBar">
                <Form.Label>Search Food Database</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  onClick={handleChange}
                  value={searchTerm}
                />
              </Form.Group>
              <div
                className="autocomplete-results"
                style={{
                  display: showAutoComplete,
                }}
              >
                <h2>Common Foods:</h2>
                <ul type="none" style={{ marginBottom: '150px' }}>
                  {autoSuggestionsCommon.map((food) => (
                    <li
                      food-name={food.food_name}
                      key={food.food_name}
                      food-id={food.food_name}
                      onClick={handleClickCommon}
                      style={{
                        marginBottom: '5px',
                        justifyContent: 'left',
                        border: '1px',
                      }}
                    >
                      <img
                        src={food.photo.thumb}
                        alt={food.food_name}
                        food-name={food.food_name}
                        food-id={food.food_name}
                        width="30px"
                        height="30px"
                        style={{ marginRight: '5px' }}
                      />
                      {food.food_name}
                    </li>
                  ))}
                </ul>
                <h2>Branded Foods:</h2>
                <ul type="none" style={{ marginBottom: '40px' }}>
                  {autoSuggestionsBranded.map((food) => (
                    <li
                      food-name={food.food_name}
                      key={food.food_name}
                      food-id={food.nix_item_id}
                      onClick={handleClickBranded}
                      style={{ marginBottom: '5px' }}
                    >
                      <img
                        src={food.photo.thumb}
                        alt={food.food_name}
                        food-name={food.food_name}
                        food-id={food.nix_item_id}
                        width="30px"
                        height="30px"
                        style={{ marginRight: '5px' }}
                      />
                      {food.food_name}
                    </li>
                  ))}
                </ul>
              </div>
            </Row>
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

export default AutoCompleteBar;
