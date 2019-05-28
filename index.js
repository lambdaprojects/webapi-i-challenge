// implement your API here
//const http = require("http");

const express = require("express");

const server = express();
const port = "8000";

// const server = http.createServer((req, res) => {
//   res.statusCode = "200";
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World, from NodeJS");
// });

server.get("/", (req, res) => {
  res.send("API is running and server is listening! Is this live?");
});

server.listen(port, () => {
  console.log(`API is running and server is listening on port ${port}`);
});
