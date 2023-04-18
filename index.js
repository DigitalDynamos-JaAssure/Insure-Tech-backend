const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.URI;

mongoose.connect(uri, {});

mongoose.connection.once('open', () => {
    console.log("mongodb connected");
})
// const ferry = require('./Routes/Ferry')
// const bookings = require('./Routes/Booking')
const user = require('./routes/user')
const policy = require('./routes/policy')
const claim = require('./routes/claim')


app.use('/user', user)
app.use('/policy', policy)
app.use('/claim', claim)


// app.use('/add', ferry)
// app.use('/booking', bookings)

app.get('/', (req, res) => {
    res.json("running!")
})

app.listen(port, () => {
    console.log("server running on port :-" + port);
});