import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import FoodLogEntry from './FoodLogEntry';
import AddFood from './AddFood';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';

const FoodLog = ({ myFoods, setMyFoods }) => {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [foodsChangedToggle, setFoodsChangedToggle] = useState(false);

  const handleChangeStartDate = ({ target }) => {
    setStartDate(target.value);
  };

  const handleChangeEndDate = ({ target }) => {
    setEndDate(target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const startSearch = new Date(moment(startDate));
      const endSearch = new Date(moment(endDate));
      endSearch.setDate(endSearch.getDate() + 1);
      try {
        const res = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/foods',
          withCredentials: true,
          params: {
            'consumedAt[gte]': startSearch,
            'consumedAt[lt]': endSearch,
          },
        });

        setMyFoods(res.data.data);
      } catch (error) {
        toast.error('Error fetching food journal');
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodsChangedToggle, startDate, endDate]);

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={handleChangeStartDate}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={handleChangeEndDate}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div className="mb-5">
        <div
          className="overflow-auto"
          style={{ maxHeight: '30rem', overflow: 'scroll' }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date Consumed</th>
                <th>Food Name</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food) => (
                <tr key={food._id}>
                  <FoodLogEntry
                    consumedAt={food.consumedAt}
                    foodName={food.name}
                    calories={food.calories}
                  />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <AddFood
            foodsChangedToggle={foodsChangedToggle}
            setfoodsChangedToggle={setFoodsChangedToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodLog;
