const express = require('express');
const path = require('path');
//check if i need a clog for this project
// const { clog } = require('./middleware/clog');
const api = require('./routes/notesindex');


const PORT = process.env.PORT || 3001;
//localhost:3002

// express if needed
const app = express();

// app.use(express.static('public'));


//if clog is needed
// app.use(clog);

//if needed
// Middleware for parsing JSON and urlencoded form data, do I need?
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Get Route for no default on refresh home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// //GET
// app.get('/api/notes', (req, res) => {res.json(data)});

//post
// app.post('/api/notes', (req, res) => {console.info(`${req.method}`)});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`));

