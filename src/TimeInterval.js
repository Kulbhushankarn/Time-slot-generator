import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// function App() {
//     return (
//       <div className="App">
//         <DateTimePicker />
//       </div>
//     );
//   }

  function DateTimePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(moment().startOf('day'));
    const [endTime, setEndTime] = useState(moment().endOf('day'));
    const [interval, setInterval] = useState(15);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleStartTimeChange = (value) => {
      setStartTime(value);
    };
  
    const handleEndTimeChange = (value) => {
      setEndTime(value);
    };
  
    const handleIntervalChange = (event) => {
      setInterval(Number(event.target.value));
    };
  
    const handleDateTimeSelection = () => {
      const selectedDate = moment(startDate).format('YYYY-MM-DD');
      const selectedTime = moment(startTime).format('HH:mm:ss');
      setSelectedDateTime(`${selectedDate} ${selectedTime}`);
      localStorage.setItem('selectedDateTime', `${selectedDate} ${selectedTime}`);
    };
  
    return (
      <div>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <br />
                <DatePicker selected={startDate} onChange={handleStartDateChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="startTime">
                <Form.Label>Start Time</Form.Label>
                <br />
                <TimePicker showSecond={false} value={startTime} onChange={handleStartTimeChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <br />
                <DatePicker selected={endDate} onChange={handleEndDateChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <br />
                <TimePicker showSecond={false} value={endTime} onChange={handleEndTimeChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="interval">
                <Form.Label>Time Interval (in minutes)</Form.Label>
                <Form.Control type="number" value={interval} onChange={handleIntervalChange} />
              </Form.Group>
            </Col>
          </Row>
          <Button onClick={handleDateTimeSelection}>Select</Button>
        </Form>
        </div>
    )
  }
  export default DateTimePicker;
  