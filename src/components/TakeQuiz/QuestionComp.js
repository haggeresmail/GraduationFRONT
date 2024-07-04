//************************************************************************************************** */
import React, { useEffect, useState } from "react";

const QuestionComp = ({ question, handleAnswer, questionNumber, selectedOption }) => {
  const { questionId, questionText, choiceA, choiceB, choiceC, choiceD, type } = question;

  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption || null);

  useEffect(() => {
    if (selectedOption) {
      setLocalSelectedOption(selectedOption);
    }
  }, [selectedOption]);

  const handleRadioSelection = (choice) => {
    setLocalSelectedOption(choice);
    handleAnswer(questionId, choice);
  };

  return (
    <div className="question">
      <p className="fw-bold">Question {questionNumber}: {questionText}</p>
      {type === "mcq" ? (
        <div>
          <label htmlFor={`choiceA_${questionId}`} className="box">
            <input
              type="radio"
              id={`choiceA_${questionId}`}
              name={`question_${questionId}`}
              value={choiceA}
              checked={localSelectedOption === choiceA}
              onChange={() => handleRadioSelection(choiceA)}
            />
            <div className="course">
              <span className="circle" />
              <span className="subject">{choiceA}</span>
            </div>
          </label>

          <label htmlFor={`choiceB_${questionId}`} className="box">
            <input
              type="radio"
              id={`choiceB_${questionId}`}
              name={`question_${questionId}`}
              value={choiceB}
              checked={localSelectedOption === choiceB}
              onChange={() => handleRadioSelection(choiceB)}
            />
            <div className="course">
              <span className="circle" />
              <span className="subject">{choiceB}</span>
            </div>
          </label>

          <label htmlFor={`choiceC_${questionId}`} className="box">
            <input
              type="radio"
              id={`choiceC_${questionId}`}
              name={`question_${questionId}`}
              value={choiceC}
              checked={localSelectedOption === choiceC}
              onChange={() => handleRadioSelection(choiceC)}
            />
            <div className="course">
              <span className="circle" />
              <span className="subject">{choiceC}</span>
            </div>
          </label>

          <label htmlFor={`choiceD_${questionId}`} className="box">
            <input
              type="radio"
              id={`choiceD_${questionId}`}
              name={`question_${questionId}`}
              value={choiceD}
              checked={localSelectedOption === choiceD}
              onChange={() => handleRadioSelection(choiceD)}
            />
            <div className="course">
              <span className="circle" />
              <span className="subject">{choiceD}</span>
            </div>
          </label>
        </div>
      ) : (
        <div>
          <textarea
            className="textareaquiz"
            name={`essay-${questionId}`}
            id={`essay-${questionId}`}
            rows="4"
            cols="50"
            onBlur={(e) => handleAnswer(questionId, e.target.value)}
            placeholder="Write your answer here..."
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default QuestionComp;

