// implement your API here
//const http = require("http");

const express = require("express");
const database = require("./data/db");

const server = express();
const port = "8000";

// const server = http.createServer((req, res) => {
//   res.statusCode = "200";
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World, from NodeJS");
// });

// server.get("/", (req, res) => {
//   res.send("API is running and server is listening! Is this live?");
// });

server.get("/api/users", (req, res) => {
  database
    .find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      sendUserError(500, "The users information could not be retrieved.", res);
      return;
    });
});

server.get("/api/users/:id", (req, res) => {
  database
    .findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        sendUserError(404, "User with that Id does not exist");
        return;
      }
      res.json(user);
    })
    .catch(error => {
      sendUserError(500, "Error looking up user", res);
      return;
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  database
    .remove(id)
    .then(res => {
      if (res === 0) {
        sendUserError(404, `The user with the id ${id} does not exist. `, res);
        return;
      }
      res.json({ success: `User with id: ${id} removed from system` });
    })
    .catch(error => {
      sendUserError(500, "The user could not be removed", res);
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !body) {
    sendUserError(400, "Must provide name and bio", res);
    return;
  }
  database.update(id, { name, bio }).then(response => {
    if (response === 0) {
      sendUserError(404, "The user with the specified ID does not exist.", res);
      return;
    }
  });
  database
    .findById(id)
    .then(user => {
      if (user.length === 0) {
        sendUserError(404, "User with that id not found", res);
        return;
      }
      res.status(201).json(user);
    })
    .catch(error => {
      sendUserError(500, "Something bad happened in the database", res);
      return;
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    sendUserError(400, "Must provide name and bio", res);
    return;
  }
  database
    .insert({
      name,
      bio,
      created_at,
      updated_at
    })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      sendUserError(400, error, res);
      return;
    });
});

server.listen(port, () => {
  console.log(`API is running and server is listening on port ${port}`);
});
