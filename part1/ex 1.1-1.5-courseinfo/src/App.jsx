const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Content = (props) => {
  console.log(props.parts);
  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={index} name={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises: {totalExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
