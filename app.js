require("dotenv").config();
require("./config/db").connect();
const auth = require("./middleware/auth");
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Logic goes here
const User = require("./models/user");

// Register Endpoint
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password, contact_number } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    

        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name: first_name.toLowerCase(),
          last_name: last_name.toLowerCase(),
          email: email.toLowerCase(), 
          password: encryptedPassword,
          contact_number: contact_number
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
});


// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
  
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});


// Get User Details 
app.get("/viewMemberDetails", auth, async (req, res) => {
   const userEmail = req.user.email
   const member = await User.findOne({userEmail})

   // exclude returning the password
   const {_id, first_name, last_name, email, password, contact_number, __v} = member 
   res.json({ first_name, last_name, email, contact_number })
});

module.exports = app;