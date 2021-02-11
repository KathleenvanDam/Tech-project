const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/students', (req, res) => {
    res.send('List of movies!')
});
app.get('/students/:studentId', (req, res) => {
    res.send(`<h1>Detailpage of student ${req.params.studentId} </h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});