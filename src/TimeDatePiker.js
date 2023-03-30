import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('18:00');
  const [timeInterval, setTimeInterval] = useState(30);
  const [selectedDateTime, setSelectedDateTime] = useState([]);

  const StartDateChange = (date) => {
    setStartDate(date);
  };

  const EndDateChange = (date) => {
    setEndDate(date);
  };

  const StartTimeChange = (time) => {
    setStartTime(time);
  };

  const EndTimeChange = (time) => {
    setEndTime(time);
  };

  const TimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };

  const DateTimeSelect = () => {
    const selectedDateTimeArr = [];
    let currentDate = new Date(startDate.getTime());
    let endTimeParts = endTime.split(':').map((part) => parseInt(part));
    let currentHour = parseInt(startTime.split(':')[0]);
    let currentMinute = parseInt(startTime.split(':')[1]);
    const timeIntervalMs = timeInterval * 60000;
    while (currentDate.getTime() <= endDate.getTime()) {
      while (currentHour < endTimeParts[0] || (currentHour === endTimeParts[0] && currentMinute <= endTimeParts[1])) {
        selectedDateTimeArr.push(new Date(currentDate.getTime() + ((currentHour * 60) + currentMinute) * 60000));
        currentMinute += timeInterval;
        if (currentMinute >= 60) {
          currentMinute = currentMinute % 60;
          currentHour += 1;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
      currentHour = parseInt(startTime.split(':')[0]);
      currentMinute = parseInt(startTime.split(':')[1]);
    }
    setSelectedDateTime(selectedDateTimeArr);
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={StartDateChange} />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={EndDateChange} />
      </div>
      <div>
        <label>Start Time:</label>
        <TimePicker value={startTime} onChange={StartTimeChange} />
      </div>
      <div>
        <label>End Time:</label>
        <TimePicker value={endTime} onChange={EndTimeChange} />
      </div>
      <div>
        <label>Time Interval (in minutes):</label>
        <input type="number" value={timeInterval} onChange={TimeIntervalChange} />
      </div>
      <button onClick={DateTimeSelect}>Select Date and Time</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {selectedDateTime.map((dateTime) => (
              <tr key={dateTime}>
                <td>{dateTime.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateTimePicker;
