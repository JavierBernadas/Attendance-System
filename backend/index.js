const user = require('./models/user.model')
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const PORT = 4000 || 5000;
const userRoute = require('./routes/routesUser.js')
const attendanceRoute = require('./routes/routesAttendance.js')
require("./cron/attendanceCron.js");
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
// ✅ Add this middleware BEFORE any routes
app.use(express.json());

//to connect local DB ! ! !
// mongoose.connect('mongodb://127.0.0.1:27017/AttendanceDatabase') old ! ! !
mongoose.connect('mongodb://localhost:27017/AttendanceDatabase')
  .then(() => {
   console.log('Mongodb Connected!')
   //check local port running ! ! ! 
  app.listen(PORT, ()=>
{
    console.log("Server is Running in Local PORT  || " + PORT)
})
  }).catch(err => console.error(err))

// for testing ! ! !
app.get('/', (req, res) => {
  res.send('App is Working!')
})

// user routes ! ! ! !
app.use("/user", userRoute);


// attendance routes ! ! ! !
app.use("/attendance", attendanceRoute);
