import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeInterval, setTimeInterval] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { startDate, endDate, startTime, endTime, timeInterval };
    localStorage.setItem("dateTimePickerData", JSON.stringify(data));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dateTimePickerData"));
    if (data) {
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setTimeInterval(data.timeInterval);
    }
  }, []);

//   const DataTable = () => {
//     const [data, setData] = useState([]);
    
//     useEffect(() => {
//         const storedData = JSON.parse(localStorage.getItem("dateTimePickerData"));
//         if (storedData){
//             setData([storedData]);
//         }
//     },[]);
//   }

  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </div>
    <br/>
    <div>
    <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
    <br/>
    <div>
    <label htmlFor="startTime">Start Time:</label>
      <input
        type="time"
        id="startTime"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
    </div>
    <br/>
    <div>
    <label htmlFor="endTime">End Time:</label>
      <input
        type="time"
        id="endTime"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
    <br/>
    <div>
    <label htmlFor="timeInterval">Time Interval:</label>
      <select
        id="timeInterval"
        value={timeInterval}
        onChange={(e) => setTimeInterval(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="5">5 minutes</option>
        <option value="10">10 minutes</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
      </select>
    </div>
    <br/>
      <button type="submit">Save</button>
    </form>
  );
};

export default DateTime;
