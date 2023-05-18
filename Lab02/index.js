const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
  console.log(req);
 /*  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Hello Node!</h1>'); */
});

server.on('listening', () => {
  console.log('Server is listening on port 8000');
});
server.listen(8000);

//Routing requests
server.on('request', (req, res) => {
  if( req.url === '/'){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
      <h1>Hello Node!</h1>
      <a href="/read-message">Read Message</a>
      <a href="/write-message">Write Message</a>
      `);
  }else if(req.url === '/read-message'){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.end('Error occurred while reading the message');
        } else {
          res.end(`
            <h2>Message:</h2>
            <p>${data}</p>
          `);
        }});
      }else if(req.url === '/write-message'){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
      <form action="/write-message" method="POST">
        <input type="text" name="message" placeholder="Enter your message">
        <button type="submit">Submit</button>
      </form>
    `);
  }else if(req.url === '/write-message'){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
      <form action="/write-message" method="POST">
        <input type="text" name="message" placeholder="Enter your message">
        <button type="submit">Submit</button>
      </form>
    `);
  }
      
});