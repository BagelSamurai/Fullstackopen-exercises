import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positivePercentage}%`} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodButton = () => setGood(good + 1);
  const neutralButton = () => setNeutral(neutral + 1);
  const badButton = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodButton}>good</button>
      <button onClick={neutralButton}>neutral</button>
      <button onClick={badButton}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
