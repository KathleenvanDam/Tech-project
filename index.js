const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser')

const students = [
  {"name": "Thomas", "studie": "CMD", "age": "18"},
  {"name": "Nina", "studie": "Economie", "age": "17"},
  {"name": "Marijke", "studie": "Geschiedenis", "age": "20"}
];

const adults = students.filter(person => person.age >= 18);
const study = students.filter(person => person.studie === 'Economie');

console.log(study);

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(express.urlencoded(true));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', {title:'Studentlist'});
});
app.get('/filter', (req, res) => {
  res.render('filter', {title: 'Filter'});
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that page!")
});

app.post('/',function (req,res) {
    var name = req.body.test;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});