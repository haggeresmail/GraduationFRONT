// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import QuestionComp from "./QuestionComp";
// import question from "./question";
// // import "./takequiz.css";

// const Questions = ({ answer, setAnswer }) => {
//   const [number, setNumber] = useState(0);
//   const [show, setShow] = useState(true);
//   const [time, setTime] = useState(15); // Initial time in seconds
//   const [timerExpired, setTimerExpired] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const resetAnswer = useCallback(() => {
//     setAnswer(Array(question.length).fill(null)); // Reset answers to an array of nulls
//   }, [setAnswer]);

//   useEffect(() => {
//     resetAnswer(); // Reset answers when starting a new quiz
//   }, [resetAnswer]);

//   useEffect(() => {
//     // Timer logic using setInterval to decrement timer every second
//     const timerInterval = setInterval(() => {
//       setTime((prevTime) => prevTime - 1);
//     }, 1000);

//     // Cleanup function to clear interval when component unmounts or timer reaches zero
//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, []);

//   const handleSubmit = useCallback(() => {
//     navigate("/solution"); // Use navigate to redirect to "/solution" route
//   }, [navigate]);

//   useEffect(() => {
//     // Check if timer has expired
//     if (time <= 0) {
//       setTimerExpired(true);
//       // Trigger automatic submission when time reaches zero
//       handleSubmit();
//     }
//   }, [time, handleSubmit]);

//   const handleAnswer = (id, ans) => {
//     let temp = [...answer];
//     temp[id] = ans;
//     setAnswer([...temp]);
//   };

//   const handleIncrement = () => {
//     if (number === question.length - 1) {
//       alert("This is the last question");
//       setShow(false);
//       return;
//     }
//     setNumber(number + 1);
//   };

//   const handleDecrement = () => {
//     if (number === 0) return;
//     setNumber(number - 1);
//   };

//   // Define the threshold for the color change
//   const nearEndTime = 5; // Change this value to set the threshold

//   // Calculate the percentage of time remaining
//   const timePercentage = (time / 15) * 100; // Assuming the initial time is 15 seconds


//   return (
//     <div className="container mb-5">
//       <div className="row">
//         <div className="col-12">
//           <QuestionComp
//             question={question[number]}
//             handleAnswer={handleAnswer}
//           />
//           <div className="buttons">
//             <button className="btn btn-primary px-4 py-2 fw-bold" onClick={handleDecrement}>
//               Prev
//             </button>
//             {show ? (
//               <button className="btn btn-success px-4 py-2 fw-bold" onClick={handleIncrement}>
//                 Next
//               </button>
//             ) : (
//               <button className="btn btn-info px-4 py-2 fw-bold" onClick={handleSubmit}>
//                 Submit
//               </button>
//             )}
//              </div>
//           {time !== null && (
//             <>
//               <p style={{ color: time <= nearEndTime ? "red" : "black" }}>
//                 Time left: {time} seconds
//               </p>
//               <div
//                 style={{
//                   height: "10px",
//                   width: "100%",
//                   backgroundColor: "#e0e0e0",
//                   borderRadius: "5px",
//                   margin: "10px 0",
//                 }}
//               >
//                 <div
//                   style={{
//                     height: "100%",
//                     width: `${timePercentage}%`,
//                     backgroundColor: time <= nearEndTime ? "red" : "green",
//                     borderRadius: "5px",
//                     transition: "width 1s ease-in-out",
//                   }}
//                 />
//               </div>
//             </>
//           )}
//           {timerExpired && <p>Time's up! Submitting...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Questions;
//******************************************************************************************************** */
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import QuestionComp from "./QuestionComp";

// const Questions = ({ studentId, courseId, answer, setAnswer }) => {
//   const [questions, setQuestions] = useState([]);
//   const [number, setNumber] = useState(0);
//   const [show, setShow] = useState(true);
//   const [time, setTime] = useState(15); // Initial time in seconds
//   const [timerExpired, setTimerExpired] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const resetAnswer = useCallback(() => {
//     setAnswer(Array(questions.length).fill(null)); // Reset answers to an array of nulls
//   }, [questions.length, setAnswer]);

//   useEffect(() => {
//     resetAnswer(); // Reset answers when starting a new quiz
//   }, [resetAnswer]);

//   useEffect(() => {
//     // Timer logic using setInterval to decrement timer every second
//     const timerInterval = setInterval(() => {
//       setTime((prevTime) => prevTime - 1);
//     }, 1000);

//     // Cleanup function to clear interval when component unmounts or timer reaches zero
//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, []);

//   const handleSubmit = useCallback(() => {
//     navigate("/solution"); // Use navigate to redirect to "/solution" route
//   }, [navigate]);

//   useEffect(() => {
//     // Check if timer has expired
//     if (time <= 0) {
//       setTimerExpired(true);
//       // Trigger automatic submission when time reaches zero
//       handleSubmit();
//     }
//   }, [time, handleSubmit]);

//   const handleAnswer = (id, ans) => {
//     let temp = [...answer];
//     temp[id] = ans;
//     setAnswer([...temp]);
//   };

//   const handleIncrement = () => {
//     if (number === questions.length - 1) {
//       alert("This is the last question");
//       setShow(false);
//       return;
//     }
//     setNumber(number + 1);
//   };

//   const handleDecrement = () => {
//     if (number === 0) return;
//     setNumber(number - 1);
//   };

//   // Define the threshold for the color change
//   const nearEndTime = 5; // Change this value to set the threshold

//   // Calculate the percentage of time remaining
//   const timePercentage = (time / 15) * 100; // Assuming the initial time is 15 seconds

//   // Fetch questions from the API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(`/api/AssignmentQuestion/GenerateAssignment/${studentId}/${courseId}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setQuestions(data);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, [studentId, courseId]);

//   return (
//     <div className="container mb-5">
//       <div className="row">
//         <div className="col-12">
//           {questions.length > 0 && (
//             <QuestionComp
//               question={questions[number]}
//               handleAnswer={handleAnswer}
//             />
//           )}
//           <div className="buttons">
//             <button className="btn btn-primary px-4 py-2 fw-bold" onClick={handleDecrement}>
//               Prev
//             </button>
//             {show ? (
//               <button className="btn btn-success px-4 py-2 fw-bold" onClick={handleIncrement}>
//                 Next
//               </button>
//             ) : (
//               <button className="btn btn-info px-4 py-2 fw-bold" onClick={handleSubmit}>
//                 Submit
//               </button>
//             )}
//           </div>
//           {time !== null && (
//             <>
//               <p style={{ color: time <= nearEndTime ? "red" : "black" }}>
//                 Time left: {time} seconds
//               </p>
//               <div
//                 style={{
//                   height: "10px",
//                   width: "100%",
//                   backgroundColor: "#e0e0e0",
//                   borderRadius: "5px",
//                   margin: "10px 0",
//                 }}
//               >
//                 <div
//                   style={{
//                     height: "100%",
//                     width: `${timePercentage}%`,
//                     backgroundColor: time <= nearEndTime ? "red" : "green",
//                     borderRadius: "5px",
//                     transition: "width 1s ease-in-out",
//                   }}
//                 />
//               </div>
//             </>
//           )}
//           {timerExpired && <p>Time's up! Submitting...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Questions;
//******************************************************************************************************** */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuestionComp from "./QuestionComp";

const Questions = ({ studentId, courseId, answer, setAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(15); // Initial time in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const resetAnswer = useCallback(() => {
    setAnswer(Array(questions.length).fill(null)); // Reset answers to an array of nulls
  }, [questions.length, setAnswer]);

  useEffect(() => {
    resetAnswer(); // Reset answers when starting a new quiz
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
  //   try {
  //     // Prepare the answers payload
  //     const payload = {
  //       studentId,
  //       courseId,
  //       answers: answer.map((ans, index) => ({
  //         questionId: questions[index].questionId,
  //         studentAnswer: ans
  //       }))
  //     };

  //     // Send the answers to the backend
  //     const response = await fetch('https://honeybee-becoming-piglet.ngrok-free.app/api/AssignmentQuestion/SubmitAnswers', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit answers');
  //     }

  //     // Navigate to the solution page on successful submission
  //     navigate("/solution");
  //   } catch (error) {
  //     console.error('Error submitting answers:', error);
  //     alert('There was an error submitting your answers. Please try again.');
  //   }
  // }, [navigate, answer, studentId, courseId, questions]);
  const handleSubmit = useCallback(() => {
        navigate("/solution"); // Use navigate to redirect to "/solution" route
      }, [navigate]);
    

  useEffect(() => {
    // Check if timer has expired
    if (timerExpired) {
      handleSubmit();
    }
  }, [timerExpired, handleSubmit]);

  const handleAnswer = (id, ans) => {
    let temp = [...answer];
    temp[id] = ans;
    setAnswer([...temp]);
  };

  const handleIncrement = () => {
    if (number === questions.length - 1) {
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

  // Define the threshold for the color change
  const nearEndTime = 5; // Change this value to set the threshold

  // Calculate the percentage of time remaining
  const timePercentage = (time / 15) * 100; // Assuming the initial time is 15 seconds

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://honeybee-becoming-piglet.ngrok-free.app/api/AssignmentQuestion/GenerateAssignment/20240001/is446`);

        // Check if the response is not ok
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        // Attempt to parse the JSON response
        const data = await response.json();

        // Infer question type based on the response data structure
        const formattedQuestions = data.map((q) => ({
          ...q,
          type: q.choiceA && q.choiceB && q.choiceC && q.choiceD ? "mcq" : "essay"
        }));

        setQuestions(formattedQuestions);
      } catch (error) {
        // Log the error to the console
        console.error('Error fetching questions:', error);
        // Optional: Provide user feedback
        alert('There was an error fetching the questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, [studentId, courseId]);

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12">
          {questions.length > 0 && (
            <QuestionComp
              question={questions[number]}
              handleAnswer={handleAnswer}
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
