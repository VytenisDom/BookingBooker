const express = require("express");
const cors = require('cors');
const Booking = require('../models/Booking');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());


// Create a new booking
Booking.create({
  topic: 'New Meeting',
  startDate: '2023-12-02 09:00',
  endDate: '2023-12-02 10:00',
  numOfParticipants: 5,
})

const bookings = [
    {
        topic : "Testing GET",
        startDate: "2023-12-01 08:00",
        endDate: "2023-12-01 09:00",
        numOfParticipants: "4"
    }
];

app.listen(5678, () => {
    console.log("Listening at 5678 port");
});

app.get('/getBookings', (req, res) => {
    Booking.findAll()
    .then((bookings) => {
        res.send(JSON.stringify(bookings))
    })
    .catch((error) => {
        res.send(JSON.stringify(error))
    });
});

app.post('/addBooking', (req, res) => {
    const { topic, startDate, endDate, numOfParticipants } = req.body.booking;

    Booking.create({
        topic,
        startDate,
        endDate,
        numOfParticipants,
      })
    .then((booking) => {
        // Send new list back
        Booking.findAll()
        .then((bookings) => {
            res.send(JSON.stringify(bookings))
        })
        .catch((error) => {
            res.send(JSON.stringify(error))
        });
    })
    .catch((error) => {
        res.send(JSON.stringify(error))
    });

});

app.delete('/removeBooking/:id', (req, res) => {
    const { id } = req.params;
    Booking.findByPk(id)
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return booking.destroy();
    })
    .then((booking) => {
        // Send new list back
        Booking.findAll()
        .then((bookings) => {
            res.send(JSON.stringify(bookings))
        })
        .catch((error) => {
            res.send(JSON.stringify(error))
        });
    })
    .catch((error) => {
        res.send(JSON.stringify(error))
    });
});

app.put('/editBooking/:id', (req, res) => {
    const { id } = req.params;
    const { topic, startDate, endDate, numOfParticipants } = req.body.booking;

    Booking.findByPk(id)
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      booking.topic = topic;
      booking.startDate = startDate;
      booking.endDate = endDate;
      booking.numOfParticipants = numOfParticipants;

      return booking.save();
    })
    .then((booking) => {
        // Send new list back
        Booking.findAll()
        .then((bookings) => {
            res.send(JSON.stringify(bookings))
        })
        .catch((error) => {
            res.send(JSON.stringify(error))
        });
    })
    .catch((error) => {
        res.send(JSON.stringify(error))
    });

});

module.exports = app;
