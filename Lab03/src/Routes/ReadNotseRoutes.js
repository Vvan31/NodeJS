const express = require('express');
const readNotesRoutes = express.Router();
const path = require('path');
const fs = require('fs');
readNotesRoutes.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../Model', 'notes.json'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error reading JSON file');
          return;
        }
    
        const jsonData = JSON.parse(data); // Parse the JSON data
    
        // Pass the JSON data to the HTML file
        res.render('readNotes', { jsonData });
      });
});

module.exports = readNotesRoutes;