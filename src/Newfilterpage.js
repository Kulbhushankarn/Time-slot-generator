import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// import Filter from "./Filter";

const TimeSlotGenerator = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeInterval, setTimeInterval] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [typeInput, setTypeInput] = useState("minutes");
  const [dataArr, setDataArr] = useState('')


  const handleTypeSelection = (event) => {
    if (event.target.value === "minutes") {
      setTypeInput("minutes");
      console.log("Minutes");
    } else if (event.target.value === "hours") {
      setTypeInput("hours");
      console.log("hours");
    }
  };
  const handleTimeSlotLengthChange = (event) => {
    if (typeInput === "hours") {
      let mins = event.target.value * 60;
      setTimeInterval(mins);
      console.log(timeInterval);
    }
    if (typeInput === "minutes") {
      setTimeInterval(parseInt(event.target.value));
    }
  };



  const handleGenerateSlots = () => {
    const start = moment(startDate + " " + startTime, "YYYY-MM-DD HH:mm");
    const end = moment(endDate + " " + endTime, "YYYY-MM-DD HH:mm");
    const interval = moment.duration(timeInterval, "minutes");
    const slots = [];

    while (start.isSameOrBefore(end)) {
      const slotStart = start.format("h:mm a");
      start.add(interval);
      const slotEnd = start.isBefore(end) ? start.format("h:mm a") : end.format("h:mm a");
      slots.push({ date: start.format("YYYY-MM-DD"), start: slotStart, end: slotEnd });
    }
    console.log(slots);
    setTimeSlots(slots);
    const stringiFiedObject = JSON.stringify(slots);

    // console.log(timeSlots);
    localStorage.setItem("key", stringiFiedObject)
  };

  function showFilteredData() {
    let data = localStorage.getItem("key");
    data = JSON.parse(data);
    setDataArr(data)
  }

  return (
    <div className="App">
      <h1>Generate the Time Slots</h1>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div>
        <label>Time..........</label>
        <input type="text" onChange={handleTimeSlotLengthChange} />
        <div>
          <select onChange={handleTypeSelection}>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>

      </div>

        <button onClick={handleGenerateSlots}>Generate Slots</button>
        <button onClick={() => navigate("/Filter")}>Filter</button>
        <button onClick={showFilteredData}>Show Filtered Data</button>
      {timeSlots.length > 0 && (
        <table >
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr key={index}>
                <td>{slot.date}</td>
                <td>{slot.start}</td>
                <td>{slot.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {dataArr.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {dataArr.map((slot, index) => (
              <tr key={index}>
                <td>{slot.date}</td>
                <td>{slot.start}</td>
                <td>{slot.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No Filtered Slots"
      )}
    </div>
  );
};

export default TimeSlotGenerator;
