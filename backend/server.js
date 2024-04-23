const express = require("express");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const availabilityDataPath = path.join(
  __dirname,

  "availability.json"
);
const availabilityData = JSON.parse(fs.readFileSync(availabilityDataPath));

app.get("/doctor-availability", (req, res) => {
  const { date, time } = req.query;
  const requestedDate = moment(date, "YYYY-MM-DD");

  const dayAvailability =
    availabilityData.availabilityTimings[
      requestedDate.format("dddd").toLowerCase()
    ];

  if (!dayAvailability || dayAvailability.length === 0) {
    const nextAvailableDate = getNextAvailableDate(requestedDate);
    res.json({
      isAvailable: false,
      nextAvailableSlot: {
        date: nextAvailableDate.format("YYYY-MM-DD"),
        time:
          availabilityData.availabilityTimings[
            nextAvailableDate.format("dddd").toLowerCase()
          ][0].start,
      },
    });
  } else {
    const availableSlot = dayAvailability.find((slot) => {
      const slotStart = moment(slot.start, "HH:mm");
      const slotEnd = moment(slot.end, "HH:mm");
      const requestedTime = moment(time, "HH:mm");
      return requestedTime.isBetween(slotStart, slotEnd, null, "[]");
    });

    if (availableSlot) {
      res.json({ isAvailable: true });
    } else {
      const nextAvailableSlot = dayAvailability.find((slot) =>
        moment(slot.start, "HH:mm").isAfter(moment(time, "HH:mm"))
      );
      if (nextAvailableSlot) {
        res.json({
          isAvailable: false,
          nextAvailableSlot: {
            date: date,
            time: nextAvailableSlot.start,
          },
        });
      } else {
        const nextAvailableDate = getNextAvailableDate(requestedDate);
        res.json({
          isAvailable: false,
          nextAvailableSlot: {
            date: nextAvailableDate.format("YYYY-MM-DD"),
            time:
              availabilityData.availabilityTimings[
                nextAvailableDate.format("dddd").toLowerCase()
              ][0].start,
          },
        });
      }
    }
  }
});

function getNextAvailableDate(requestedDate) {
  let nextAvailableDate = requestedDate.clone().add(1, "days");
  while (
    !availabilityData.availabilityTimings[
      nextAvailableDate.format("dddd").toLowerCase()
    ] ||
    availabilityData.availabilityTimings[
      nextAvailableDate.format("dddd").toLowerCase()
    ].length === 0
  ) {
    nextAvailableDate.add(1, "days");
  }
  return nextAvailableDate;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
