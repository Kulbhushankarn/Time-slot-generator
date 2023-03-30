// import logo from './logo.svg';
import './App.css';
// import DateTimePicker from './DateTimePicker';
import FilterPage from './newtask';
import { Route, Routes } from 'react-router-dom';
// import TimeSlotGenerator from './TimeSlotGenerator';
import TimeSlotGenerator from './NewTimedate';
import Filter from './Newfilter';




function App() {

  return (
    <Routes>
      <Route path="/" element={<TimeSlotGenerator/>}/>
      <Route path='/filter' element={<Filter/>}/>
    </Routes>
  );
}

export default App;