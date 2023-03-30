import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

const DateTimePicker = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('18:00');
  const [timeInterval, setTimeInterval] = useState(30);
  const [selectedDateTime, setSelectedDateTime] = useState([]);
  const [timeIntervalUnit, setTimeIntervalUnit] = useState("minutes");


  useEffect(() => {
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');
    const storedStartTime = localStorage.getItem('startTime');
    const storedEndTime = localStorage.getItem('endTime');
    const storedTimeInterval = localStorage.getItem('timeInterval');

    if (storedStartDate) setStartDate(new Date(storedStartDate));
    if (storedEndDate) setEndDate(new Date(storedEndDate));
    if (storedStartTime) setStartTime(storedStartTime);
    if (storedEndTime) setEndTime(storedEndTime);
    if (storedTimeInterval) setTimeInterval(parseInt(storedTimeInterval));
  }, []);


  useEffect(() => {
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('endTime', endTime);
    localStorage.setItem('timeInterval', timeInterval);
  }, [startDate, endDate, startTime, endTime, timeInterval]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };
  const handleTimeIntervalUnitChange = (event) => {
    setTimeIntervalUnit(event.target.value);
  };

  const handleDateTimeSelect = () => {
    const selectedDateTimeArr = [];
    let currentDate = new Date(startDate.getTime());
    let endTimeParts = endTime.split(':').map((part) => parseInt(part));
    let currentHour = parseInt(startTime.split(':')[0]);
    let currentMinute = parseInt(startTime.split(':')[1]);
    const timeIntervalMs = timeInterval * 60000
    ;
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
    console.log(selectedDateTimeArr);
    localStorage.setItem("key",selectedDateTimeArr);
    setSelectedDateTime(selectedDateTimeArr);
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <Calendar selected={startDate} onChange={handleStartDateChange} />
      </div>
      <br/>
      <div>
        <label>End Date:</label>
        <Calendar selected={endDate} onChange={handleEndDateChange} />
      </div>
      <br/>
      <div>
        <label>Start Time:</label>
        <TimePicker value={startTime} onChange={handleStartTimeChange} />
      </div>
      <br/>
      <div>
        <label>End Time:</label>
        <TimePicker value={endTime} onChange={handleEndTimeChange} />
      </div>
      <br/>
      {/* <div>
        <label>Time Interval (in minutes):</label>
        <input type="number" value={timeInterval} onChange={handleTimeIntervalChange} />
      </div> */}
      <div>
    <label>Time Interval:</label>
    <input type="number" value={timeInterval} onChange={handleTimeIntervalChange} />
    <select value={timeIntervalUnit} onChange={handleTimeIntervalUnitChange}>
      <option value="minutes">Minutes</option>
      <option value="hours">Hours</option>
    </select>
  </div>
      <br/>
      <button onClick={handleDateTimeSelect}>Select Date and Time</button>
      <br/>
      <br/>
      <button onClick={()=>navigate("/filter")}>Filter</button>
      <br/>
      <br/>
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
