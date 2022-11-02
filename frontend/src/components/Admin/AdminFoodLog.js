import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import AdminFoodLogEntry from './AdminFoodLogEntry';
import AdminAddFood from './AdminAddFood';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const AdminFoodLog = ({ user }) => {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [allFoods, setAllFoods] = useState([]);

  const handleChangeStartDate = ({ target }) => {
    setStartDate(target.value);
  };

  const handleChangeEndDate = ({ target }) => {
    setEndDate(target.value);
  };

  const getData = async () => {
    console.log('getData()');
    const startSearch = new Date(moment(startDate));
    const endSearch = new Date(moment(endDate));
    endSearch.setDate(endSearch.getDate() + 1);
    console.log('Start Date ' + startSearch);
    console.log('End Date: ' + endSearch);
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/foods/admin',
        withCredentials: true,
        params: {
          'consumedAt[gte]': startSearch,
          'consumedAt[lt]': endSearch,
        },
      });

      console.log(res.data.data);
      setAllFoods(res.data.data);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmitDates = async (event) => {
    event.preventDefault();
    getData();
  };

  return (
    <div className="mb-5">
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
      <div className="d-flex justify-content-end mb-5">
        <Button variant="primary" onClick={handleSubmitDates}>
          Get All Foods
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Created By User</th>
            <th>Date Consumed</th>
            <th>Food Name</th>
            <th>Calories</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allFoods.map((food) => (
            <tr key={food._id}>
              <AdminFoodLogEntry
                food={food}
                allFoods={allFoods}
                setAllFoods={setAllFoods}
              />
            </tr>
          ))}
        </tbody>
      </Table>
      <AdminAddFood user={user} allFoods={allFoods} setAllFoods={setAllFoods} />
    </div>
  );
};

export default AdminFoodLog;
