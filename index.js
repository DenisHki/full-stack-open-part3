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
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

// display the time  and how many entries are in the phonebook
app.get("/info", (req, res) => {
  const entries = persons.length;
  const timeNow = new Date();
  res.send(`Phonebook has info for ${entries} people <br/> ${timeNow}`);
});

// get all persons
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// get person by id
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    console.log(`Couldn't fetch the person with id ${id}.`);
    res.status(404).end();
  }
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
        return res.status(400).json({ error: "Name must be unique" });
      }

      const person = new Person({ name, number });

      return person.save();
    })
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error)); 
});

// delete person by id
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
