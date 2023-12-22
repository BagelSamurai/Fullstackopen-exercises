import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Names from "./components/Names";

import phonebook from "./services/phonebook";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(null);

  useEffect(() => {
    phonebook.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addInfo = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm("Name is already added to phonebook, change number?")
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phonebook
          .update(updatedPerson.id, updatedPerson)
          .then((res) => {
            setNotificationMsg("Updated");

            setTimeout(() => {
              setNotificationMsg(null);
            }, 5000);
            setPersons(
              persons.map((p) => (p.id !== updatedPerson.id ? p : res.data))
            );
          })
          .catch((error) => {
            setNotificationMsg("Error updating the number, already deleted");

            setTimeout(() => {
              setNotificationMsg(null);
            }, 5000);
            // Handle error while updating
            console.error("Error updating the number:", error);
          });
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };

      phonebook
        .create(newObject)
        .then((res) => {
          setNotificationMsg("Added person");

          setTimeout(() => {
            setNotificationMsg(null);
          }, 5000);
          setPersons([...persons, res.data]); // Appending the newly added person to the existing list
        })
        .catch((error) => {
          // Handle error while creating
          setNotificationMsg("Error creating new entry");

          setTimeout(() => {
            setNotificationMsg(null);
          }, 5000);
          console.log(error.response.data.error);
        });
    }

    setNewName(""); // Clear the input field after adding/updating a person
    setNewNumber("");
  };

  const filterNames = (e) => {
    e.preventDefault();

    const filteredName = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value)
    );
    setFiltered(filteredName);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewNumber(e.target.value);
  };
  const deleteName = (id) => {
    if (window.confirm("Do you want to delete this?")) {
      phonebook
        .deleteEntry(id)
        .then(setPersons(persons.filter((p) => p.id != id)))
        .catch((err) => {
          setNotificationMsg("Error occurred");

          setTimeout(() => {
            setNotificationMsg(null);
          }, 5000);
          console.log(err);
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="error" message={notificationMsg} />
      <Filter filterNames={filterNames} />

      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handlePhoneChange={handlePhoneChange}
        addInfo={addInfo}
      />

      <h2>Numbers</h2>
      {filtered.length > 0 ? (
        <Names arrayObject={filtered} deleteId={deleteName} />
      ) : (
        <Names arrayObject={persons} deleteId={deleteName} />
      )}
    </div>
  );
};

export default App;
