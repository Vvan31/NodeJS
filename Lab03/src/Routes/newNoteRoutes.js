const express = require('express');
const newNoteRoutes = express.Router();
const path = require('path');

const fs = require('fs');
const notesFilePath = path.join(__dirname, '../Model', 'notes.json');

newNoteRoutes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'note.html'));
});

newNoteRoutes.post('/', (req, res) => {
    const { title, content } = req.body;
    const newNote = {
      title,
      content
    };
    console.log(newNote);
  
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading notes file.');
      }
  
      const notes = JSON.parse(data);
      notes.push(newNote);
  
      fs.writeFile(notesFilePath, JSON.stringify(notes), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error writing notes file.');
        }
  
        console.log('Note saved successfully!');
        res.redirect('/');
      });
    });
  });
  
module.exports = newNoteRoutes;