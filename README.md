# Setting up the program locally 
1. Clone the project to your computer. 
2. Run `npm install` or `npm i` to install the relevant module dependecies required for the program to run. 
3. To run the program on development, use the command `npm run dev`. 

# Connecting to the database
1. Feel free to contact me to get the database password, API_PORT and token key. 

# Available Endpoints 

**Non protected routes**

_When testing on postman, include this key-value pair in the headers: 
`Content-Type: application/json`_
1. `register` : Registers a user to the carpark availability checking system [POST]
2. `login` : Authenticates and logs the user into the account [POST]



**Protected routes**

_When testing on postman, include this key-value pair in the headers: `x-access-token: $token`_
1. `viewMemberDetails`: View current user's details [GET]
2. `carparkDetails`: Returns carpark availability based on current timestamp [GET]

To test any of the endpoints above, install [postman](https://www.postman.com/downloads/) on your desktop. 
 

# API url path 
[`http://localhost:4001/api/v1/users`](http://localhost:4001/api/v1/users)