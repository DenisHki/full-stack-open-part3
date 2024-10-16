require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Person = require('./models/person')
app.use(cors());

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
/*
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    //console.log("Type is", typeof(returnedObject._id))
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);
*/

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

// generate id
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => parseInt(p.id))) : 0;

  return String(maxId + 1);
};

// create a new person
app.post("/api/persons/", (req, res) => {
  console.log("Request body:", req.body);
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const nameExists = persons.some((p) => p.name === body.name);
  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.status(201).json(person);
});

// delete person by id
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
