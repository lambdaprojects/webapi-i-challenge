// implement your API here
//const http = require("http");

const express = require("express");

const port = "5000";

// const server = http.createServer((req, res) => {
//   res.statusCode = "200";
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World, from NodeJS");
// });
const server = express();

server.get("/", (req, res) => {
  res.send("Hello world from Express!");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
