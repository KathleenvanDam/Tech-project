const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/home');
});
app.get('/students', (req, res) => {
    res.render('pages/students');
});
app.get('/students/:studentId', (req, res) => {
    res.send(`<h1>Detailpage of student ${req.params.studentId} </h1>`)
});
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that page!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});