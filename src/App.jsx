import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import Options from "./components/Options/Options";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [active, setActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&type=multiple"
      );
      const data = await response.json();

      if (mounted) {
        setQuestions(data.results);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, [numberOfQuestions]);

  const noSymbols = (string) => {
    return string
      .replaceAll("&quot;", `"`)
      .replaceAll("&#039;", `'`)
      .replaceAll("&amp;", "&")
      .replaceAll("&rsquo;", "’")
      .replaceAll('&aacute;', 'á')
      .replaceAll('&eacute;', 'é')
      .replaceAll('&iacute;', 'í')
      .replaceAll('&oacute;', 'ó')
      .replaceAll('&uacute;', 'ú')
      .replaceAll('&ouml;', 'Ö')
  };

  const handleSeeResults = (selectedOption) => {
    if(selectedOption === ''){
      Swal.fire({
        title: 'Error!',
        text: 'You must select an option before viewing the results.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    else if(selectedOption === questions[0].correct_answer){
      setCorrectAnswersCounter(correctAnswersCounter+1)
      setActive(true);
    } else{
      setActive(true);
    }
  };

  const handleContinue = e =>{
    e.preventDefault()
    setActive(false)
    setSelectedOption('')
    setNumberOfQuestions(numberOfQuestions + 1);
  }

  const receiveSelectedOption = (optionReceived) =>{
    setSelectedOption(optionReceived)
  }

  return (
    <>
      {questions != [] ? (
        <>
          {questions.map((question) => (
            <div className="container" key={question.question}>
              <div className='question-container'>
                <h1 className='correct-answers'>Correct answers: {correctAnswersCounter}</h1>
                <h1 className="question">{noSymbols(question.question)}</h1>
              </div>
              <Options sendSelectedOption={receiveSelectedOption} questions={questions} active={active} noSymbols={noSymbols} />
              <div className='button-container'>
                {active == false ? <button className='button' onClick={() => handleSeeResults(selectedOption)}>See results</button> :
                <button className='button' onClick={handleContinue}>Continue</button>}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
