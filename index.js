const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser')
const slug = require('slug')

const students = [
  {"id": "student 1", "name": "Thomas", "studie": "CMD", "age": "18"},
  {"id": "student 2", "name": "Nina", "studie": "CMD", "age": "17"},
  {"id": "student 3", "name": "Marijke", "studie": "CMD", "age": "20"}
];

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
app.post('/', (req, res) => {
  const id = slug(req.body.name);
  const student = {"id": "id", "name": req.body.name, "studie": req.body.studie, "age": req.body.age};
  students.push(student);
  res.render('home', {title: "added new students", student});
});
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that page!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});