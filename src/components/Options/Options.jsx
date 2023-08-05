import { useState, useEffect } from "react";
import "./Options.css";

function Options({ questions, active, sendSelectedOption }) {

  const [randomOptions, setRandomOptions] = useState([]);

  useEffect(() => {
    let correctOption = questions[0].correct_answer;
    let incorrectAnswer = questions[0].incorrect_answers;
    let allOptions = [...incorrectAnswer, correctOption];
    setRandomOptions(allOptions.sort(() => Math.random() - 0.5));
  }, []);

  function manageClassName(option) {
    if (active == true && option === questions[0].correct_answer) {
      return 'correct'
    } else if (active == true && option !== questions[0].correct_answer) {
      return "incorrect"
    }
  }
  
  const handleActive = (e) => {
    sendSelectedOption(e.target.textContent)
  };


  return (
    <div className="options-container">
      {randomOptions.map((option) => (
        <button
          key={option}
          className={`options-button ${manageClassName(option)}`}
          onClick={handleActive}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
