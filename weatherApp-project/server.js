// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder//

app.use(express.static('WeatherApp'));

// Setup Server
const port = 8000;
const  server = app.listen(port, ()=>{console.log(`running on localhost:${port}`)});



/* Get route */
app.get("/", function (req, res) {
    res.send(projectData)
  })

/* Post route */
app.post("/", function(req,res) {
    let newData = req.body;
    let newEntry= {
        date: newData.date,
        temp: newData.temp,
        content: newData.content
    }
    projectData.push(newEntry);
    console.log(projectData)
});


