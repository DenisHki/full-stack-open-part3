const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// display the time  and how many entries are in the phonebook
app.get("/info", (req, res) => {
  const entries = persons.length;
  const timeNow = new Date();
  res.send(`Phonebook has info for ${entries} people <br/> ${timeNow}`);
});

// get all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
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

// delete person by id
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
