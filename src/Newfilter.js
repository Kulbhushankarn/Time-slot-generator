//firstpage

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

const { RangePicker } = ReactDatePicker;

export default function Filter() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [ans, setAns] = useState([]);

  //OnChange Function for start time
  function handleStartTimeChange(e) {
    const inputTime = e.target.value;
    const formattedTime = moment(inputTime, "HH:mm").format("h:mm a");
    setStartTime(formattedTime);
  }

  //OnChange Function for End time
  function handleEndTimeChange(e) {
    const inputTime = e.target.value;
    const formattedTime = moment(inputTime, "HH:mm").format("h:mm a");
    setEndTime(formattedTime);
  }
  // Submit
  function handleFilter() {
    console.log(startTime, endTime);
    console.log(startDate, endDate);
    const startDateTime = moment(`${startDate} ${startTime}`);
    const endDateTime = moment(`${endDate} ${endTime}`);
    console.log(startDateTime, endDateTime);

    let data = localStorage.getItem("key");
    data = JSON.parse(data);
    console.log(data);

    const filteredData = data.filter((item) => {
      const itemDateTime = moment(`${item.date} ${item.end}`);
      console.log(itemDateTime);
      return itemDateTime.isBetween(startDateTime, endDateTime);
    });
    setAns(filteredData);
    console.log(filteredData);
    const stringiFiedObject = JSON.stringify(filteredData);
    localStorage.setItem("key", stringiFiedObject);
  }
  return (
    <div className="App">
      <h1>Filter the Data</h1>
      <RangePicker
        onChange={(values) => {
          const value1 = moment(new Date(values[0])).format("YYYY-MM-DD");
          const value2 = moment(new Date(values[1])).format("YYYY-MM-DD");
          setStartDate(value1);
          setEndDate(value2);
        }}
      />
      <div>
        <label htmlFor="startTime">Start Time</label>
        <input type="time" name="" id="" onChange={handleStartTimeChange} />
      </div>
      <div>
        <label htmlFor="endTime">End Time</label>
        <input type="time" name="" id="" onChange={handleEndTimeChange} />
      </div>
      {ans.length===0 &&<button onClick={handleFilter}>Filter Now</button>}
        {ans.length > 0 && <button onClick={()=>navigate("/")}>Get Filtered Data</button>}

      {/* {ans.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {ans.map((slot, index) => (
              <tr key={index}>
                <td>{slot.date}</td>
                <td>{slot.start}</td>
                <td>{slot.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No Slots"
      )} */}
    </div>
  );
}
