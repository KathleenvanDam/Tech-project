const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser')

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(express.urlencoded());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});