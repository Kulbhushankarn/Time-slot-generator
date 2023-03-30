import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const FilterPage = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [finalData,setFinalData] = useState();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const FilterHandel = () => {
    let data = localStorage.getItem("key");
    data = JSON.parse(data);
    let start = moment(`$(startDate) $(startTime)`);
    let end = moment(`$(endDate) $(endTime)`);
    const FilterValues = data.filter((value) => {
      const Item = moment(`$(value.date) $(value.end)`);
      return Item.isBetween(start, end);
    });
    setFinalData(FilterValues)
    console.log(FilterValues);
    console.log(finalData);
  };

  

  return (
    <div>
      <h3>Filter by Date and Time</h3>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
          minDate={moment().toDate()}
          maxDate={moment().add(1, "year").toDate()}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
          minDate={moment().toDate()}
          maxDate={moment().add(1, "year").toDate()}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="time" onChange={handleStartTimeChange} value={startTime} />
      </div>
      <div>
        <label>End Time:</label>
        <input type="time" onChange={handleEndTimeChange} value={endTime} />
      </div>

      <button type="submit" onClick={FilterHandel}>
        Filter
      </button>
    </div>
  );
};


export default FilterPage;
