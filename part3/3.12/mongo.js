const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://rohanc:${password}@cluster0.mpov83v.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("Person", personSchema);

const addEntry = (name, phone) => {
  const person = new Person({
    name,
    phone,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${phone} to phonebook`);
    mongoose.connection.close();
  });
};

const listEntries = () => {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.phone}`);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length === 3) {
  listEntries();
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const phone = process.argv[4];
  addEntry(name, phone);
}
