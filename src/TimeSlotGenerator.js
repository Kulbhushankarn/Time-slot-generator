import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';



const TimeSlotGenerator = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeInterval, setTimeInterval] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [dataArr, setDataArr] = useState("");
  



  const handleGenerateSlots = () => {
    const startDateTime = new Date(startDate + " " + startTime);
    const endDateTime = new Date(endDate + " " + endTime);
    const intervalMinutes = parseInt(timeInterval);
    const slots = [];
    let currentDateTime = new Date(startDateTime);
    while (currentDateTime < endDateTime) {
      const slotStartDate = formatDate(currentDateTime);
      const slotStartTime = formatTime(currentDateTime);
      currentDateTime = new Date(currentDateTime.getTime() + intervalMinutes * 60000);
      const slotEndDate = currentDateTime <= endDateTime ? formatDate(currentDateTime) : endDate;
      const slotEndTime = currentDateTime <= endDateTime ? formatTime(currentDateTime) : endTime;
      slots.push({ date: slotStartDate, start: slotStartTime, end: slotEndTime });
    }
    setTimeSlots(slots)
    localStorage.setItem("key",JSON.stringify(slots));
    // console.log(startDate);
  };

  function showData() {
    let data = localStorage.getItem("key");
    data = JSON.parse(data);
    setDataArr(data)
  }
  console.log()
  


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const formatTime = (date) => {
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>Time Interval (in minutes):</label>
        <input type="number" value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)} />
      </div>
      <br/>
      <button onClick={handleGenerateSlots}>Generate Slots</button>
      <br/>
      <button onClick={()=>navigate("/filter")}>Filter</button>
      <br/>
      <br/>
      <button onClick={showData}>Filter-Data</button>
      <br/>
      {timeSlots.length > 0 && (
        <table>
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
      <tbody>
        {timeSlots.map((slot, index) =>(
          <tr key = {index}>
            <td>{slot.date}</td>
            <td>{slot}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};
export default TimeSlotGenerator;
