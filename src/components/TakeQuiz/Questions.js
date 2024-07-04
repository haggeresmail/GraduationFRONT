
//******************************************************************************************************** */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuestionComp from "./QuestionComp";
import axios from "axios";

const Questions = ({ studentId, courseId, answer, setAnswer, questions }) => {
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(15); // Initial time in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedOptions, setSelectedOptions] = useState({});

  const resetAnswer = useCallback(() => {
    setAnswer(Array(questions.length).fill(null)); // Reset answers to an array of nulls
    setSelectedOptions({});
  }, [questions.length, setAnswer, setSelectedOptions]);

  useEffect(() => {
    resetAnswer(); // Reset answers and selected options when starting a new quiz
  }, [resetAnswer]);

  useEffect(() => {
    // Timer logic using setInterval to decrement timer every second
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

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // const handleSubmit = useCallback(async () => {
  //   // Navigate to the solution page on successful submission
  //   navigate("/solution");
  //   try {
  //     // Prepare the answers payload
  //     const payload = {
  //       studentId,
  //       courseId,
  //       answers: answer.map((ans, index) => ({
  //         questionId: questions[index].questionId,
  //         studentAnswer: ans,
  //         selectedOption: selectedOptions[index] || null,
  //       })),
  //     };

  //     // Send the answers to the backend
  //     const response = await axios.post(
  //       'https://learnhub.runasp.net/api/AssignmentQuestion/UploadAssignment',
  //       payload,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to submit answers');
  //     }

  //     // Navigate to the solution page on successful submission
  //     navigate("/solution");
  //   } catch (error) {
  //     console.error('Error submitting answers:', error);
  //     // alert('There was an error submitting your answers. Please try again.');
  //   }
  // }, [navigate, answer, selectedOptions, studentId, courseId, questions]);
  const handleSubmit = useCallback(async () => {
    // Navigate to the solution page on successful submission
    navigate("/solution");
    console.log('Questions:', questions);
    console.log('Answers:', answer);
    console.log('Selected Options:', selectedOptions);

    // Check if questions array is populated
    if (!questions || questions.length === 0) {
      console.error('Questions array is empty or undefined');
      return;
    }

    try {
      // Prepare the answers payload
      const payload = {
        studentId,
        courseId,
        answers: answer.map((ans, index) => {
          const question = questions[index];
          if (!question) {
            console.error(`Question not found for index ${index}`);
            return null;
          }

          return {
            questionId: question.questionId,
            studentAnswer: ans,
            selectedOption: selectedOptions[question.questionId] || null,
          };
        }).filter(Boolean), // Filter out any null values
      };

      // Send the answers to the backend
      const response = await axios.post(
        'https://learnhub.runasp.net/api/AssignmentQuestion/UploadAssignment',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to submit answers');
      }

      // Navigate to the solution page on successful submission
      navigate("/solution");
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  }, [navigate, answer, selectedOptions, studentId, courseId, questions]);

  useEffect(() => {
    // Check if timer has expired
    if (timerExpired) {
      handleSubmit();
    }
  }, [timerExpired, handleSubmit]);

  const handleAnswer = (questionId, choice) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: choice,
    }));
    // Update the answer state as well
    let temp = [...answer];
    temp[questionId] = choice;
    setAnswer(temp);
  };

  // const handleIncrement = () => {
  //   if (number === questions.length - 1) {
  //     alert("This is the last question");
  //     setShow(false);
  //     return;
  //   }
  //   setNumber(number + 1);
  // };

  // const handleDecrement = () => {
  //   if (number === 0) return;
  //   setNumber(number - 1);
  // };
  const handleIncrement = () => {
    if (number === questions.length - 1) {
      // alert("This is the last question");
      setShow(false); // Hide submit button when on last question
      return;
    }
    setNumber((prevNumber) => Math.min(prevNumber + 1, questions.length - 1));
  };
  
  const handleDecrement = () => {
    if (number === 0) {
      return; // Already at the first question, do nothing
    }
    setNumber((prevNumber) => Math.max(prevNumber - 1, 0));
  };
  

  // Define the threshold for the color change
  const nearEndTime = 5; // Change this value to set the threshold

  // Calculate the percentage of time remaining
  const timePercentage = (time / 15) * 100; // Assuming the initial time is 15 seconds

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
