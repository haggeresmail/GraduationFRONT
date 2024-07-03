
// import React, { useState,useEffect } from 'react';
// import QuestionComp from './QuestionCompAss'; // Assuming QuestionComp is correctly implemented
// import "./assignmentform.css";
// import axios from 'axios';

// const AssignmentForm = ({ studentId, courseId }) => {
//   const [answers, setAnswers] = useState({}); // Store answers for both MCQ and Essay questions
//   const [questions, setQuestions] = useState({});

//   // Sample questions array
//   // const questions = [
//   //   {
//   //     questionId: 1,
//   //     questionText: '3 + 3 =?',
//   //     choiceA: '2',
//   //     choiceB: '5',
//   //     choiceC: '4',
//   //     choiceD: '6',
//   //     type: 'mcq',
//   //   },
//   //   {
//   //     questionId: 2,
//   //     questionText: '30 + 30 =?',
//   //     choiceA: '50',
//   //     choiceB: '20',
//   //     choiceC: '40',
//   //     choiceD: '60',
//   //     type: 'mcq',
//   //   },
//   //   {
//   //     questionId: 3,
//   //     questionText: 'Orange is the result of adding ...',
//   //     choiceA: 'Red and White',
//   //     choiceB: 'Green and White',
//   //     choiceC: 'Red and Black',
//   //     choiceD: 'Black and White',
//   //     type: 'mcq',
//   //   },
//   //   {
//   //     questionId: 4,
//   //     questionText: 'Explain the significance of the color orange.',
//   //     type: 'essay',
//   //   },
//   // ];

//   const handleMCQAnswer = (questionId, answer) => {
//     setAnswers({
//       ...answers,
//       [questionId]: answer,
//     });
//   };

//   const handleEssayAnswer = (questionId, answer) => {
//     setAnswers({
//       ...answers,
//       [questionId]: answer,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         studentId,
//         courseId,
//         answers,
//       };

//       const response = await axios.post('http://learnhub.runasp.net/api/SubmitAnswers', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         console.log('Answers submitted successfully:', response.data);
//         alert('Answers submitted successfully!');
//       } else {
//         console.error('Failed to submit answers:', response.data);
//         alert('Failed to submit answers. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting answers:', error);
//       alert('There was an error submitting your answers. Please try again.');
//     }
//   };

//   useEffect(() => {
//         const fetchQuestions = async () => {
//           try {
//             const response = await axios.get(
//               `http://learnhub.runasp.net/api/AssignmentQuestion/GenerateAssignment/20240001/is1`,
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//               }
//             );
    
//             if (response.status !== 200) {
//               throw new Error(`Request failed with status ${response.status}`);
//             }
    
//             const data = response.data;
    
//             // Assuming data is an array of questions with 'type' attribute (mcq or essay)
//             setQuestions(data);
//           } catch (error) {
//             console.error('Error fetching questions:', error);
//             alert('There was an error fetching the questions. Please try again later.');
//           }
//         };
    
//         fetchQuestions();
//       }, [studentId, courseId]);

//   return (
//     <div className="container1">
//       <h2>Assignment Questions</h2>
//       {questions.map((question,index) => (
//         <QuestionComp
//           key={question.questionId}
//           question={question}
//           questionNumber={index + 1} // Pass the question number
//           handleMCQAnswer={handleMCQAnswer}
//           handleEssayAnswer={handleEssayAnswer}
//         />
//       ))}
//       <button className="btn btn-primary" onClick={handleSubmit}>
//         Submit Answers
//       </button>
//     </div>
//   );
// };

// export default AssignmentForm;

import React, { useState, useEffect } from 'react';
import QuestionComp from './QuestionCompAss'; // Assuming QuestionComp is correctly implemented
import axios from 'axios';
import "./assignmentform.css";

const AssignmentForm = ({ studentId, courseId }) => {
  const [answers, setAnswers] = useState([]); // Store answers for both MCQ and Essay questions
  const [questions, setQuestions] = useState([]); // Initialize questions state as an empty array

  // Function to handle MCQ answers
  const handleMCQAnswer = (questionId, answer) => {
    const updatedAnswers = answers.map((ans) =>
      ans.questionId === questionId ? { ...ans, studentAnswer: answer } : ans
    );
    setAnswers(updatedAnswers);
  };

  // Function to handle Essay answers
  const handleEssayAnswer = (questionId, answer) => {
    const updatedAnswers = answers.map((ans) =>
      ans.questionId === questionId ? { ...ans, studentAnswer: answer } : ans
    );
    setAnswers(updatedAnswers);
  };

  // Function to submit answers to the backend
  const handleSubmit = async () => {
    try {
      const answersPayload = answers.map(answer => ({
        questionId: answer.questionId,
        choiceA: answer.choiceA,
        choiceB: answer.choiceB,
        choiceC: answer.choiceC,
        choiceD: answer.choiceD,
        studentAnswer: answer.studentAnswer,
      }));
  
      const payload = {
        studentId: 20240001,
        assignmentId: 2, // Replace with the actual assignmentId
        courseId: 'is1', // Replace with the correct courseId
        answers: answersPayload,
      };
  
      console.log('Payload:', payload); // Log payload to verify courseId
  
      const response = await axios.post('http://learnhub.runasp.net/api/AssignmentQuestion/UploadAssignment', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log('Answers submitted successfully:', response.data);
        alert('Answers submitted successfully!');
      } else {
        console.error('Failed to submit answers:', response.data);
        alert('Failed to submit answers. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      if (error.response) {
        console.log('Response data:', error.response.data); // Log detailed error response
      }
      alert('There was an error submitting your answers. Please try again.');
    }
  };
  

  // Fetch questions from backend upon component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://learnhub.runasp.net/api/AssignmentQuestion/GenerateAssignment/20240001/is1`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = response.data;

        // Determine the type of each question
        const processedQuestions = data.map((question) => {
          const type = question.hasOwnProperty('choiceA') && question.hasOwnProperty('choiceB') ? 'mcq' : 'essay';
          return {
            ...question,
            type: type,
          };
        });

        // Set questions and initialize answers state
        setQuestions(processedQuestions);
        setAnswers(processedQuestions.map((question) => ({
          questionId: question.questionId,
          studentAnswer: '', // Initially empty student answer
        })));
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('There was an error fetching the questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, [studentId, courseId]);

  return (
    <div className="container1">
      <h2>Assignment Questions</h2>
      {questions.map((question, index) => (
        <QuestionComp
          key={question.questionId}
          question={question}
          questionNumber={index + 1} // Pass the question number
          handleMCQAnswer={handleMCQAnswer}
          handleEssayAnswer={handleEssayAnswer}
          type={question.type} // Pass the type of the question
        />
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Answers
      </button>
    </div>
  );
};

export default AssignmentForm;
