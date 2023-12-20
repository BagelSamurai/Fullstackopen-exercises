import React from "react";

const Names = ({ arrayObject, deleteId }) => {
  const handleDelete = (id) => {
    deleteId(id);
  };
  return (
    <>
      {arrayObject.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </>
  );
};

export default Names;
