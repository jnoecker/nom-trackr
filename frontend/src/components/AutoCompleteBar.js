import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import {
  AUTOCOMPLETE_RESPONSE,
  COMMON_FOOD_RESPONSE,
  BRANDED_FOOD_RESPONSE,
} from '../util/fakeResponses';

const AutoCompleteBar = () => {
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
    console.log('QUERY: ' + searchString);
    try {
      /* TODO: Re-enable when not in danger of running out of usage
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
      */
      const res = AUTOCOMPLETE_RESPONSE;

      console.log(JSON.stringify(res));
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

    // TODO: Try/catch
    /* TODO: Re-enable later
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
    */
    const res = COMMON_FOOD_RESPONSE;
    const calories = res?.data?.foods[0]?.nf_calories | 0;
    console.log(res.data);
    console.log(
      `${foodName} -> ${calories} calories per ${res?.data?.foods[0]?.serving_qty} ${res?.data?.foods[0]?.serving_unit}`
    );
    setSearchTerm(foodName);
    setNewFoodName(foodName);
    setnewFoodCalories(calories);
  };

  const handleClickBranded = async ({ target }) => {
    const foodName = target.getAttribute('food-name');
    const foodId = target.getAttribute('food-id');

    hideAutoCompleteOverlay();

    // TODO: Try-catch
    /* TODO: Re-enable later
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
    */
    const res = BRANDED_FOOD_RESPONSE;
    const calories = res?.data?.foods[0]?.nf_calories || 0;
    console.log(res.data);
    console.log(
      `${foodName} -> ${calories} calories per ${res?.data?.foods[0]?.serving_qty} ${res?.data?.foods[0]?.serving_unit}`
    );
    setSearchTerm(foodName);
    setNewFoodName(foodName);
    setnewFoodCalories(calories);
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

  const handleAddFood = async () => {
    const createdTime = new Date(moment(newFoodDateConsumed));
    createdTime.setHours(12);
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
    <div className="autocomplete-div">
      <form onClick={hideAutoCompleteOverlay}>
        <input
          type="date"
          value={newFoodDateConsumed}
          onChange={handleChangeDate}
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
      <form>
        <input
          type="text"
          className="autocomplete-bar"
          name="foodName"
          onChange={handleChange}
          onClick={handleChange}
          size="100"
          value={searchTerm}
        />
      </form>
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
    </div>
  );
};

export default AutoCompleteBar;
