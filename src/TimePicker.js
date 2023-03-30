import {From, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

function MyProject() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [interval, setInterval] = useState(30);
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    const handleIntervalChange = (event) => {
      setInterval(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the form data
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="startDate">
          <Form.Label column sm="2">
            Start Date
          </Form.Label>
          <Col sm="10">
            <DateTimePicker
              onChange={handleStartDateChange}
              value={startDate}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="endDate">
          <Form.Label column sm="2">
            End Date
          </Form.Label>
          <Col sm="10">
            <DateTimePicker onChange={handleEndDateChange} value={endDate} />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="interval">
          <Form.Label column sm="2">
            Interval (in minutes)
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={interval}
              onChange={handleIntervalChange}
            />
          </Col>
        </Form.Group>
  
        <button type="submit">Submit</button>
      </Form>
    );
  }
export default MyProject;  