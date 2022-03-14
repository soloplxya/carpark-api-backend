require("dotenv").config();
require("../config/db").connect();

const User = require("../models/user");
const axios = require("axios");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const dayjs = require("dayjs");
dayjs.extend(utc);
dayjs.extend(timezone);

exports.userDetails = async (req, res) => {
    const userEmail = req.user.email;
    const member = await User.findOne({'email': userEmail});
   
    // exclude password, __id and __v
    const {_id, first_name, last_name, email, password, contact_number, __v} = member;
    res.json({ first_name, last_name, email, contact_number });
 }


exports.carparkDetails = async (req, res) => {
    dayjs.tz.setDefault("Singapore");
    var now = dayjs().format('YYYY-MM-DD[T]HH:mm:ss');
    var CARPARK_URI = process.env.CARPARK_URI;

    // connect to the carpark endpoint
    axios.get(CARPARK_URI + `?date_time=${now}`)
          .then(response => {
            res.json(response.data);
          })
          .catch(error => {
            console.log(error);
    })
}
