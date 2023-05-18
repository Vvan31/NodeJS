const express = require('express');
/* Create an express application */
const app = express();
/* const router = express.Router(); */

// File System Module to read and write files
const fs = require('fs');

// Parse the request body data
// urlencoded() method is used to parse the 
// request body coming from the HTML form
app.use(express.urlencoded({ extended: true }));
// LocalHost:8000 no request
app.get('/', (req, res) => {
    res.send(`
    <h1>Hello Node!</h1>
    <a href="/read-message">Read Message</a>
    <a href="/write-message">Write Message</a>
    `);
});
/* LocalHost:8000/read-message no request
    Reads file named "message.txt"*/
app.get('/read-message', (req, res) => {
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.send('Error occurred while reading the message');
        } else {
          res.send(`
            <h2>Message:</h2>
            <p>${data}</p>
          `);
        }
      });
});
/* LocalHost:8000/write-message no request
    Writes file named "message.txt"*/
app.get('/write-message', (req, res) => {
    res.send(`
    <form action="/write-message" method="POST">
      <input type="text" name="message" placeholder="Enter your message">
      <button type="submit">Submit</button>
    </form>
  `);
});
/* LocalHost:8000/write-message request
    Writes file named "message.txt"*/
app.post('/write-message', (req, res) => {
    const message = req.body.message;

    fs.writeFile('message.txt', message, (err) => {
        if (err){throw err}else{
        console.log('The file has been saved!');
        res.send('Message written successfully');
        }
    });
});

// Start the server on port 8000
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
}); 