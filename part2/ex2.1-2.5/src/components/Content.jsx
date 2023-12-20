import React from "react";

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, parts) => {
    return sum + parts.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} - Exercises: {part.exercises}
        </p>
      ))}
      <p>
        <b>Total exercises: {totalExercises}</b>{" "}
      </p>
    </div>
  );
};

export default Content;
