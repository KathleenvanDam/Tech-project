const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const { MongoClient, ObjectID } = require("mongodb");
var PORT = process.env.PORT || 3000;

// Connecting DB
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

// Home route
app.get("/", async (req, res) => {
  let students = {}
  students = await db.collection("students").find({like:false}).toArray();
  res.render("home", {
    title: "Studentlist",
    results: students.length,
    students
  });
});

// Like Route
app.get('/like', async (req, res) => {
  let students = {};
  students = await db.collection("students").find({like:true}).toArray();
  res.render("like", {
    title:"Liked",
    results: students.length,
    students: students});
});

app.post('/like', async (req, res) => {
  const id = new ObjectID(req.body.id);
  //let students;

  try {
    await db.collection("students").updateOne({'_id':id}, {$set:{'like':true}});
    //students = await db.collection('students').find({like:false}).toArray();
  }
  catch (error) {
    console.error('Error:', error);
  }

  res.render("home", {
    title: 'test'
  })
})

// Filter route
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
    title:"Studentlist",
    results: students.length,
    students: students
  })
});

// Error Route
app.use(function (req, res) {
  res.status(404).send("Sorry can't find that page!")
})

// Securing PORT
app.listen(PORT, () => {
  console.log(`Example app listening on Port ${PORT}!`)
});

//TODO: ESLINT runnen (npx eslint index.js)