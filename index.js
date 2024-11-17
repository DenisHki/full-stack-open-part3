require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Person = require("./models/person");
app.use(cors());
mongoose.set("strictQuery", false);
morgan.token("body", (request) => JSON.stringify(request.body));

app.use(express.static("dist"));
app.use(express.json());
//app.use(requestLogger)
app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

console.log("Database URI: ", process.env.MONGODB_URI);

// display the time  and how many entries are in the phonebook
app.get("/info", (req, res, next) => {
  const timeNow = new Date();
  Person.find({})
    .then((persons) => {
      const entries = persons.length;
      res.send(`Phonebook has info for ${entries} people <br/> ${timeNow}`);
    })
    .catch((error) => next(error));
});

// get all persons
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

// get person by id
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        console.log(`Couldn't fetch the person with id ${id}.`);
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// create a new person
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  Person.findOne({ name })
    .then((existingPerson) => {
      if (existingPerson) {
        existingPerson.number = number;
        return existingPerson.save();
      } else {
        const person = new Person({ name, number });
        return person.save();
      }
    })
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

// delete person by id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// update person
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
