require("dotenv").config();
require("./config/db").connect();

const AppError = require('./utils/appError')
const express = require('express'); 
const cors = require('cors');
const userRoutes = require('./routes/userRoute'); 
const hpp = require('hpp')
const xss = require('xss')


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// security set up 
app.use(cors()); 
// app.use(xss()); 
// app.use(hpp());


app.use('/api/v1/users', userRoutes);
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route');
  next(err, req, res, next);
});

module.exports = app; 
