// Import the Express module
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// global variables? 
let messageFromClient = [];

// Define a route
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees'); 
        console.log(response.data);
        res.json(response.data);
    }catch(err){
        console.log(err);
    }
});

//post request
app.post('/post', (req, res) => {
    // Extract the message from the request body
    const message = req.body.message;
  
    // Log the message to the console
    console.log('post: /post'+message);
    messageFromClient = message;
  
    // Send a response back to the client
    res.send('Received message: ' + message);
  });

//post request
app.get('/post', (req, res) => {
    console.log('get: /post'+messageFromClient);
    res.send(messageFromClient);
  });

// Start the server
const port = process.env.PORT || 3000; // Use the PORT environment variable if available, otherwise use port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
