const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const port = 3000;

const year = ["year 1", "year 2", "year 3", "year 4"];

let db = null;
// function connectDB
async function connectDB() {
  //get URI form env file
  const uri = process.env.DB_URI
  //make connection to DB
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME)
}
connectDB(); 
try {
  console.log('We have made a connection to Mongo!')
  
} catch (error) {
  console.log(error)
}

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let students = {}
  students = await db.collection('students').find({}).toArray();
  res.render("home", {title: "Studentlist", results: 4, students})
})

app.post("/", (req, res) => {
  const filteredGroups = students.filter(function (students) {
    return students.age >= Number(req.body.age)
  })

  res.render("home", {
    title: "ActiveTogether",
    results: filteredGroups.length
  })
})

app.use(function (req, res) {
  res.status(404).send("Sorry can't find that page!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

//FIXME: ESLint dingen laten fixen