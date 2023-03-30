import React, {useState} from "react";
import moment from "moment";

function DateCalculator(){
    const [startDate, setStartDate] = useState("");
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [resultDate, setResultDate] = useState("");
    const [isLeapYear, setIsLeapYear] = useState(false);

    const handleAddDays = () => {
        const newDate = moment(startDate).add(numberOfDays, "days");
        setResultDate(newDate.format("Do MMMM YYYY"));
    };

    const handleSubtractDays = () => {
        const newDate = moment(startDate).subtract(numberOfDays, "days");
        setResultDate(newDate.format("Do MMMM YYYY"));
    };

    const handleLeapYear = () => {
        setIsLeapYear(moment(startDate).isLeapYear());
    };
    console.log(handleLeapYear);


    return(
        <div>
            <label htmlFor="start-date">Start Date:</label>
            <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />
            <br/>


            <label htmlFor="number-of-days">Number of days:</label>
            <input
            id="number-of-days"
            type="number"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(parseInt(e.target.value))}
            />
            <br/>

            <button onClick={handleAddDays}>Add days</button>
            <button onClick={handleSubtractDays}>Subtract days</button>
            <button onClick={handleLeapYear}>Check Leap Year</button>
            <br/>



            {resultDate && <p>Result date{resultDate}</p>}
            {isLeapYear && <p>Start date falls in a leap year</p>}
            {/* {!isLeapYear && <p>Start date not fall in a leap year</p>} */}

        </div>
    );
}
export default DateCalculator;
