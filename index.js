const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const {
  MongoClient
} = require("mongodb");
const port = process.env.PORT || 3000;

let db = null;
// function connectDB
async function connectDB() {
  //get URI form env file
  const uri = process.env.DB_URI
  //make connection to DB
  const options = {
    useUnifiedTopology: true
  };
  const client = new MongoClient(uri, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME)
}
connectDB();
try {
  console.log("We have made a connection to Mongo!")

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
  students = await db.collection("students").find({}).toArray();
  res.render("home", {
    title: "Studentlist",
    results: students.length,
    students: students
  });
});

app.post("/", async (req, res) => {
  let students = {}
  students = await db.collection("students").find({}).toArray();
  if (req.body.studie != 'all') {
    students = students.filter(student => {return student.studie === req.body.studie})
  }
  if (req.body.age != 'all') {
    students = students.filter(student => {return student.age >= req.body.age})
  }
  if (req.body.year != 'all') {
    students = students.filter(student => {return student.year === req.body.year})
  }
  
  res.render("home", {
    title: "Studenten",
    results: students.length,
    students: students
  })
})

app.use(function (req, res) {
  res.status(404).send("Sorry can't find that page!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

//TODO: ESLINT runnen (npx eslint index.js)