import React, { useState, useEffect } from "react";

const FirstPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState(null);
  const [nextAvailableSlot, setNextAvailableSlot] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/doctor-availability?date=${date}&time=${time}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.isAvailable) {
        setAvailability(true);
      } else {
        setAvailability(false);
        setNextAvailableSlot(data.nextAvailableSlot);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <div style={{ background: "lightgrey", padding: "20px" }}>
        <h1>This is the section where you get data from api</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input type="date" value={date} onChange={handleDateChange} />
          </div>
          <div>
            <label>Time</label>
            <input type="time" value={time} onChange={handleTimeChange} />
          </div>
          <button type="submit">check availability</button>
        </form>
        {availability === false && nextAvailableSlot && (
          <p>
            The doctor is not available at the specified date and time. The next
            available slot is on {nextAvailableSlot.date} at{" "}
            {nextAvailableSlot.time}
          </p>
        )}
      </div>
    </>
  );
};

export default FirstPage;
