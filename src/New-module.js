import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");
  const [timeInterval, setTimeInterval] = useState(30);
  const [timeIntervalUnit, setTimeIntervalUnit] = useState("minutes");

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

  const generateTimeIntervals = () => {
    const intervals = [];
    const startTimeObj = new Date(`1970-01-01T${startTime}`);
    const endTimeObj = new Date(`1970-01-01T${endTime}`);
    const intervalObj = new Date(`1970-01-01T00:00:00Z`);
    const timeIntervalInMs =
      timeIntervalUnit === "minutes" ? timeInterval * 60000 : timeInterval * 3600000;
    let currentTime = startTimeObj;

    while (currentTime <= endTimeObj) {
      intervals.push(currentTime.toLocaleTimeString());
      intervalObj.setTime(intervalObj.getTime() + timeIntervalInMs);
      currentTime = new Date(startTimeObj.getTime() + intervalObj.getTime());
    }

    return intervals;
  };

  const timeIntervals = generateTimeIntervals();

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
  <div>
    <label>Time Interval:</label>
    <input type="number" value={timeInterval} onChange={handleTimeIntervalChange} />
    <select value={timeIntervalUnit} onChange={handleTimeIntervalUnitChange}>
      <option value="minutes">Minutes</option>
      <option value="hours">Hours</option>
    </select>
  </div>
  <br/>
      {/* <button onClick={generateTimeIntervals}>Done</button> */}
      <br/>
      <br/>
  <div>
    <label>Time Intervals:</label>
    <ul>
      {timeIntervals.map((interval, index) => (
        <li key={index}>{interval}</li>
      ))}
    </ul>
  </div>
</div>
  ); 
}
export default DateTimePicker;