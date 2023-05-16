const express = require('express');
const readNotesRoutes = express.Router();
const path = require('path');

readNotesRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'readNotes.html'));
    console.log('Read notes page');
});

module.exports = readNotesRoutes;