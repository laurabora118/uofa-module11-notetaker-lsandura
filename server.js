const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

//for homepage to display and to deploy to heroku
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));