import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuestionComp from "./QuestionComp";
import axios from "axios";

const Questions = ({ studentId, courseId, assignmentId, answer, setAnswer, questions }) => {
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(0); // Initial time in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedOptions, setSelectedOptions] = useState({});
  const totalDurationInSeconds = 7 * 60; // Set your total time in seconds (7 minutes)

  const resetAnswer = useCallback(() => {
    setAnswer(Array(questions.length).fill(null)); // Reset answers to an array of nulls
    setSelectedOptions({});
  }, [questions.length, setAnswer, setSelectedOptions]);

  useEffect(() => {
    resetAnswer(); // Reset answers and selected options when starting a new quiz
  }, [resetAnswer]);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await axios.get(`https://learnhub.runasp.net/api/Assignment/2`);
        const data = response.data;
         const startDate = new Date(data.assignmentConfig.startDate);
        const endDate = new Date(data.assignmentConfig.endDate);

        // const startDate = new Date("2024-07-03T18:23:40.165");
        // const endDate = new Date("2024-07-03T18:30:41.165");

        const durationInSeconds = Math.floor((endDate - startDate) / 1000);
        setTime(durationInSeconds);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
      }
    };

    fetchAssignmentDetails();
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          setTimerExpired(true);
          clearInterval(timerInterval); // Stop the timer
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    navigate("/solution");

    try {
      const payload = {
        studentId: studentId,
        courseId: courseId,
        assignmentId: assignmentId,
        answers: questions.map((question) => ({
          questionId: question.questionId,
          choiceA: question.choiceA,
          choiceB: question.choiceB,
          choiceC: question.choiceC,
          choiceD: question.choiceD,
          studentAnswer: selectedOptions[question.questionId] || "", // Use selectedOptions here
        })),
      };
      console.log('Payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post(
        'https://learnhub.runasp.net/api/AssignmentQuestion/UploadAssignment',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response); 
      if (response.status === 200) {
        navigate('/solution');
      } else {
        throw new Error('Failed to submit answers');
      }
     } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
    
  }, [navigate, studentId, courseId, assignmentId, selectedOptions, questions]);

  useEffect(() => {
    if (timerExpired) {
      handleSubmit();
    }
  }, [timerExpired, handleSubmit]);

  const handleAnswer = (questionId, choice) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: choice,
    }));

    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      [questionId]: choice,
    }));
  };

  const handleIncrement = () => {
    if (number === questions.length - 1) {
      setShow(false);
    }
    setNumber((prevNumber) => Math.min(prevNumber + 1, questions.length - 1));
  };

  const handleDecrement = () => {
    if (number === 0) {
      return;
    }
    setNumber((prevNumber) => Math.max(prevNumber - 1, 0));
  };

  const nearEndTime = 5;

  const timePercentage = (time / totalDurationInSeconds) * 100;

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12">
          {questions.length > 0 && (
            <QuestionComp
              key={questions[number].questionId}
              question={questions[number]}
              handleAnswer={handleAnswer}
              selectedOption={selectedOptions[questions[number].questionId]}
              questionNumber={number + 1}
            />
          )}
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
          {time !== null && (
            <>
              <p style={{ color: time <= nearEndTime ? "red" : "black" }}>
                Time left: {time} seconds
              </p>
              <div
                style={{
                  height: "10px",
                  width: "100%",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "5px",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${timePercentage}%`,
                    backgroundColor: time <= nearEndTime ? "red" : "green",
                    borderRadius: "5px",
                    transition: "width 1s ease-in-out",
                  }}
                />
              </div>
            </>
          )}
          {timerExpired && <p>Time's up! Submitting...</p>}
        </div>
      </div>
    </div>
  );
};

export default Questions;
