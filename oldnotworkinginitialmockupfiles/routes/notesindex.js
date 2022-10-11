const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
// const homeRouter = require('./home');
// might need error log router and router page????
// const savedRouter = require('./savednotes');

const app = express();

app.use('/notes', notesRouter);
// app.use('/home', homeRouter);
// app.use('/savednotes', savednotesRouter);

module.exports = app;
