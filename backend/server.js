const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MODEL_FILE_PATH = 'model_XG.json'; // Adjust the path to your model file

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Serve the model file
  if (req.url === '/model_XG.json') {
    const filePath = path.join(__dirname, MODEL_FILE_PATH);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (req.url === '/model_weights.bin') {
    const filePath = path.join(__dirname, WEIGHTS_FILE_PATH);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(data);
      }
    });
  } else {
    // Handle other requests
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
