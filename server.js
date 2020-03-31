var express = require("express");
// var bodyParser = require("body-parser");
// var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;

// var CONTACTS_COLLECTION = "contacts";

var app = express();
// app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Client is running on port 4200");
})