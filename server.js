// require express for our routing , sessions(if needed) http request and error handling 
let projectData = {};
const express = require("express"); 
const path = require("path/posix");
//storing the express function in an app variable for easy use 
const app = express() ; 
//require body parser for the json handling and urlencoding . 
const bodyParser = require("body-parser"); 
//make use of json
app.use(bodyParser.json());
// handling url encoding , preventing nested objects
app.use(bodyParser.urlencoded({extended:false})); 
let port  = process.env.PORT || 5000;
//declaring a static source to load app files from 
app.use(express.static(path.join(__dirname,"./website")));
//setting up cors for cross site (oringin) resource sharing 
//as we will be making use of api's from another source . 
const cors = require("cors");

app.listen(port, () => {
    console.log("The server is listening in the port : " + port);
})

//creating a post route to feed the data in the projectData to 
app.post("/post", async (req, res) => {
    const body = await req.body;
    projectData = body;
    //console.log(projectData);
    res.send(projectData);
});

//creating a get route to feed the data in the projectData to 
app.get("/getdata", async (req, res) => {
    //console.log(projectData);
  res.send(projectData);
});

