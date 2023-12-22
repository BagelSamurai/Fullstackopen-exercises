import React from "react";

const Form = ({
  newName,
  handleNameChange,
  newNumber,
  handlePhoneChange,
  addInfo,
}) => {
  return (
    <form onSubmit={addInfo}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handlePhoneChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
