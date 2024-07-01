import React from 'react';

const QuestionComp = ({ question, questionNumber, handleMCQAnswer, handleEssayAnswer }) => {
  const { questionId, questionText, choiceA, choiceB, choiceC, choiceD, type } = question;

  return (
    <div className="question">
      <p className="fw-bold">Question {questionNumber}: {questionText}</p>
      {type === "mcq" ? (
        <div>
          <input type="radio" name={`question_${questionId}`} id={`choiceA_${questionId}`} value={choiceA} onChange={() => handleMCQAnswer(questionId, choiceA)} />
          <label htmlFor={`choiceA_${questionId}`} className="box">
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceA}</span>
            </div>
          </label>

          <input type="radio" name={`question_${questionId}`} id={`choiceB_${questionId}`} value={choiceB} onChange={() => handleMCQAnswer(questionId, choiceB)} />
          <label htmlFor={`choiceB_${questionId}`} className="box">
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceB}</span>
            </div>
          </label>

          <input type="radio" name={`question_${questionId}`} id={`choiceC_${questionId}`} value={choiceC} onChange={() => handleMCQAnswer(questionId, choiceC)} />
          <label htmlFor={`choiceC_${questionId}`} className="box">
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceC}</span>
            </div>
          </label>

          <input type="radio" name={`question_${questionId}`} id={`choiceD_${questionId}`} value={choiceD} onChange={() => handleMCQAnswer(questionId, choiceD)} />
          <label htmlFor={`choiceD_${questionId}`} className="box">
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceD}</span>
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
            onBlur={(e) => handleEssayAnswer(questionId, e.target.value)}
            placeholder="Write your answer here..."
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default QuestionComp;
