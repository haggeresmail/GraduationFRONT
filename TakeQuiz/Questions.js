

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuestionComp from "./QuestionComp";
import question from "./question";
// import "./takequiz.css";

const Questions = ({ answer, setAnswer }) => {
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(15); // Initial time in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const resetAnswer = useCallback(() => {
    setAnswer(Array(question.length).fill(null)); // Reset answers to an array of nulls
  }, [setAnswer]);

  useEffect(() => {
    resetAnswer(); // Reset answers when starting a new quiz
  }, [resetAnswer]);

  useEffect(() => {
    // Timer logic using setInterval to decrement timer every second
    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function to clear interval when component unmounts or timer reaches zero
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const handleSubmit = useCallback(() => {
    navigate("/solution"); // Use navigate to redirect to "/solution" route
  }, [navigate]);

  useEffect(() => {
    // Check if timer has expired
    if (time <= 0) {
      setTimerExpired(true);
      // Trigger automatic submission when time reaches zero
      handleSubmit();
    }
  }, [time, handleSubmit]);

  const handleAnswer = (id, ans) => {
    let temp = [...answer];
    temp[id] = ans;
    setAnswer([...temp]);
  };

  const handleIncrement = () => {
    if (number === question.length - 1) {
      alert("This is the last question");
      setShow(false);
      return;
    }
    setNumber(number + 1);
  };

  const handleDecrement = () => {
    if (number === 0) return;
    setNumber(number - 1);
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12">
          <QuestionComp
            question={question[number]}
            handleAnswer={handleAnswer}
          />
          <div className="buttons">
            <button className="btn btn-primary px-4 py-2 fw-bold" onClick={handleDecrement}>
              Prev
            </button>
            {show ? (
              <button className="btn btn-success px-4 py-2 fw-bold" onClick={handleIncrement}>
                Next
              </button>
            ) : (
              <button className="btn btn-info px-4 py-2 fw-bold" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
          <p>Time left: {time} seconds</p>
          {timerExpired && <p>Time's up! Submitting...</p>}
        </div>
      </div>
    </div>
  );
};

export default Questions;

