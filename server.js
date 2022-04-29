// require express for our routing , sessions(if needed) http request and error handling 
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

