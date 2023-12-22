const express = require("express");
var morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
morgan.token("post-body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-body"
  )
);
let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send(`<h1> Hello world </h1>`);
});
app.get("/api/persons", (req, res) => {
  res.json(data);
});
app.get("/info", (req, res) => {
  numEntries = data.length;
  currentTime = new Date();
  res.send(`Phonebook has info for ${numEntries} people <br />
<p>${currentTime} </p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = data.find((entry) => entry.id === id);
  if (!entry) {
    res.status(404).end();
  } else {
    res.json(entry);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  data = data.filter((entry) => entry.id !== id);
  res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({ error: "Name or number missing" });
  } else if (data.some((entry) => body.name === entry.name)) {
    return res.status(404).json({ error: "Entry exists" });
  }
  const newEntry = {
    name: body.name,
    number: body.number,
    id: maxId + 1,
  };

  data = data.concat(newEntry); // Add the new entry to the existing data array
  res.json(newEntry); // Send the newly created entry as a response
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
