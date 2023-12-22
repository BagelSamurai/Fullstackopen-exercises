import React from "react";

const Filter = ({ filterNames }) => {
  return (
    <div>
      <h2>Filter Names</h2>
      <input placeholder="Search..." onChange={filterNames} />
    </div>
  );
};

export default Filter;
