import { useState, useEffect } from "react";
import "./Options.css";

function Options({ questions, active, sendSelectedOption, noSymbols }) {

  const [randomOptions, setRandomOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('')

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
    setSelectedClass(e.target.textContent)
    sendSelectedOption(e.target.textContent)
  };


  return (
    <div className="options-container">
      {randomOptions.map((option) => (
        <button
          key={option}
          className={`options-button ${manageClassName(option)} ${selectedClass === option ? 'selected' : ''}`}
          onClick={handleActive}
        >
          {noSymbols(option)}
        </button>
      ))}
    </div>
  );
}

export default Options;
