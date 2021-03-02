const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
require("dotenv").config()

/* --- dotenv --- */
const db = require("db")
db.connect({
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})

const students = [{
    "name": "Thomas",
    "studie": "CMD",
    "age": 18
  },
  {
    "name": "Nina",
    "studie": "Economie",
    "age": 17
  },
  {
    "name": "Marijke",
    "studie": "Geschiedenis",
    "age": 20
  },
  {
    "name": "Thomas",
    "studie": "Communucitie",
    "age": 21
  },
  {
    "name": "Nina",
    "studie": "Economie",
    "age": 17
  },
  {
    "name": "Marijke",
    "studie": "Geschiedenis",
    "age": 23
  }
];

const year = ["year 1", "year 2", "year 3", "year 4"];

const adults = students.filter(person => person.age >= 18);
const study = students.filter(person => person.studie === "Economie");

console.log(study);

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Studentlist",
    results: 4
  })
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

//FIXME: Problem with the database connection