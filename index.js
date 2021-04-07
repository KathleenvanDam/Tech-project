const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const { ObjectID } = require("mongodb");
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

// public file koppelen
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//view engine 
app.set("view engine", "ejs");

// Home route
app.get("/", async (req, res) => {
  let students = {};
  students = await db.collection("students").find({like:false}).toArray();
  let queryArray = [];

  // Bron object keys: https://www.geeksforgeeks.org/object-keys-javascript/#:~:text=keys()%20Method-,Object.,is%20applied%20to%20the%20properties. Geeft alle strings terug als een opsomming (wanneer er sprake is van een opsomming).
  if(Object.keys(req.query).length){
    if (req.query.studie != 'all') {
      students = students.filter(student => {return student.studie === req.query.studie})
      queryArray.push(`studie=${req.query.studie}`);
    }
    else {
      queryArray.push(`studie=${req.query.studie}`);
    }
    if (req.query.age != 'all') {
      students = students.filter(student => {return student.age >= req.query.age})
      queryArray.push(`age=${req.query.age}`);
    }
    else {
      queryArray.push(`age=${req.query.age}`);
    }
    if (req.query.year != 'all') {
      students = students.filter(student => {return student.year === req.query.year});
      queryArray.push(`year=${req.query.year}`);
    }
    else {
      queryArray.push(`year=${req.query.year}`);
    }
  }

  // allQueries aanmaken om alle queries aan elkaar te zetten als er een lengte van queries is. 
  const allQueries = queryArray.length && `?${queryArray.join('&')}`;

  res.render("home", {
    title: "Studentlist",
    results: students.length,
    allQueries,
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
    students});
});

// Like button submit route
app.post('/', async (req, res) => {
  const id = new ObjectID(req.body.id); // Bron: https://docs.mongodb.com/manual/reference/method/ObjectId/
  let students = {};
  
  // zoeken naar studenten in de db en hun id updaten. Like van false naar true zetten. 
  await db.collection('students').update({'_id': id}, {$set:{'like':true}});
  // zoeken naar studenten in de db waarvan de like op false staat. 
  students = await db.collection('students').find({like:false}).toArray();

  res.render('home', {
    title: 'students',
    results: students.length,
    allQueries,
    students});
});

// Filter route
// Bron = Danny Frelink 
app.get('/', async (req, res) => {
  let students = {}
  let queryArray = [];
  students = await db.collection("students").find({like:false}).toArray();

  if(Object.keys(req.query).length){
    // wanneer de studie niet geselecteerd is als 'all' dan wordt de volgende regel uitgevoerd.
    if (req.query.studie != 'all') {
      // de students array wordt gefilterd door deze te overschrijven. Binnen filter -> wanneer studie van student gelijk is aan het gekozen filter. 
      students = students.filter(student => {return student.studie === req.query.studie}) // Bron filter = Sam Slotenmaker
      queryArray.push(`studie=${req.query.studie}`);
    }
    else {
      queryArray.push(`studie=${req.query.studie}`);
    }
    if (req.query.age != 'all') {
      students = students.filter(student => {return student.age >= req.query.age})
      queryArray.push(`age=${req.query.age}`);
    }
    else {
      queryArray.push(`age=${req.query.age}`);
    }
    if (req.query.year != 'all') {
      students = students.filter(student => {return student.year === req.query.year});
      queryArray.push(`year=${req.query.year}`);
    }
    else {
      queryArray.push(`year=${req.query.year}`);
    }
  };

  const allQueries = queryArray.length && `?${queryArray.join('&')}`;
  
  res.render("home", {
    title:"Studentlist",
    allQueries,
    results: students.length,
    students: students
  })
});

// Error Route
app.use(function (req, res) {
  res.status(404).send("Sorry can't find that page!")
});

// Securing PORT
app.listen(PORT, () => {
  console.log(`Example app listening on Port ${PORT}!`)
});

//TODO: ESLINT runnen (npx eslint index.js)