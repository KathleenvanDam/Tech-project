const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/home', {title:'Studentlist'});
});
app.get('/students', (req, res) => {
    res.render('pages/students');
});
app.get('/students/:name', (req, res) => {
    var data = {age: 23, study: 'CMD'};
    res.render('pages/students', {person: req.params.name, data: data});
});
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that page!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});