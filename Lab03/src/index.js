const express = require('express');
const app = express();

const Homerouter = require('./Routes/homeRoutes');
const NewNoteRoutes = require('./Routes/NewNoteRoutes');
const ReadNotesRoutes = require('./Routes/ReadNotseRoutes.js');

const port = process.env.PORT || 3000;

// Middleware that gets executed before every request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// App level middleware
app.use(Homerouter);
app.use('/new-note', NewNoteRoutes);
app.use('/read-notes', ReadNotesRoutes);

// Catch all middleware - error handling
app.use((req, res, next) => {
    res.sendFile(__dirname + '/views/404.html');
});

app.listen(port); 