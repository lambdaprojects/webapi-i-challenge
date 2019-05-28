// implement your API here
//const http = require("http");

const express = require("express");
const database = require("./data/db");

const server = express();
server.use(express.json());
const port = "8000";

// const server = http.createServer((req, res) => {
//   res.statusCode = "200";
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World, from NodeJS");
// });

// server.get("/", (req, res) => {
//   res.send("API is running and server is listening! Is this live?");
// });

// const sendUserError = (status, message, res) => {
//   // This is just a helper method that we'll use for sending errors when things go wrong.
//   res.status(status).json({ errorMessage: message });
//   return;
// };

server.get("/api/users", (req, res) => {
  database
    .find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      res.status(500).json({
        ErrorMessage: "The users information could not be retrieved."
      });
      return;
    });
});

server.get("/api/users/:id", (req, res) => {
  database
    .findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ ErrorMessage: "User with that Id does not exist" });
        return;
      }
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ ErrorMessage: "Error looking up user" });
      return;
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  database
    .remove(id)
    .then(res => {
      if (res) {
        res
          .status(200)
          .json({ success: `User with id: ${id} removed from system` });
      } else {
        res
          .status(404)
          .json({ ErrorMessage: `User with id ${id} does not exist` });
      }
    })
    .catch(error => {
      console.log("In catch ---" + error);
      res.status(500).json({ ErrorMessage: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ ErroMessage: "Must provide name and bio" });
    return;
  }
  database
    .update(id, { name, bio })
    .then(response => {
      if (response === 0) {
        res.status(404).json({
          ErrorMessage: "The user with the specified ID does not exist."
        });
        return;
      }

      database
        .findById(id)
        .then(user => {
          if (user.length === 0) {
            res
              .status(404)
              .json({ ErrorMessage: "User with that id not found" });
            return;
          }
          res.status(201).json(user);
        })
        .catch(error => {
          res.status(500).json({ ErrorMessage: "Error Looking up User" });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({ ErrorMessage: "Something bad has happened" });
    });
});

server.post("/api/users", (req, res) => {
  console.log(":: REQUEST BODY IS :: " + req.body);
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    res.status(400).json({ ErrorMessage: "Must provide name and bio" });
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
      res.status(400).json({ ErrorMessage: error });
      return;
    });
});

server.listen(port, () => {
  console.log(`API is running and server is listening on port ${port}`);
});
