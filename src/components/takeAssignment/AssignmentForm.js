
import React, { useState } from 'react';
import QuestionComp from './QuestionCompAss'; // Assuming QuestionComp is correctly implemented
import "./assignmentform.css";

const AssignmentForm = ({ studentId, courseId }) => {
  const [answers, setAnswers] = useState({}); // Store answers for both MCQ and Essay questions

  // Sample questions array
  const questions = [
    {
      questionId: 1,
      questionText: '3 + 3 =?',
      choiceA: '2',
      choiceB: '5',
      choiceC: '4',
      choiceD: '6',
      type: 'mcq',
    },
    {
      questionId: 2,
      questionText: '30 + 30 =?',
      choiceA: '50',
      choiceB: '20',
      choiceC: '40',
      choiceD: '60',
      type: 'mcq',
    },
    {
      questionId: 3,
      questionText: 'Orange is the result of adding ...',
      choiceA: 'Red and White',
      choiceB: 'Green and White',
      choiceC: 'Red and Black',
      choiceD: 'Black and White',
      type: 'mcq',
    },
    {
      questionId: 4,
      questionText: 'Explain the significance of the color orange.',
      type: 'essay',
    },
  ];

  const handleMCQAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleEssayAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    try {
      // Prepare payload to send to backend
      const payload = {
        studentId,
        courseId,
        answers,
      };

      // Replace this with your API call to submit answers
      console.log('Submitting answers:', payload);

      alert('Answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('There was an error submitting your answers. Please try again.');
    }
  };
//   useEffect(() => {
    //     const fetchQuestions = async () => {
    //       try {
    //         const response = await axios.get(
    //           `https://honeybee-becoming-piglet.ngrok-free.app/api/AssignmentQuestion/GenerateAssignment/${studentId}/${courseId}`,
    //           {
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //           }
    //         );
    
    //         if (response.status !== 200) {
    //           throw new Error(`Request failed with status ${response.status}`);
    //         }
    
    //         const data = response.data;
    
    //         // Assuming data is an array of questions with 'type' attribute (mcq or essay)
    //         setQuestions(data);
    //       } catch (error) {
    //         console.error('Error fetching questions:', error);
    //         alert('There was an error fetching the questions. Please try again later.');
    //       }
    //     };
    
    //     fetchQuestions();
    //   }, [studentId, courseId]);

  return (
    <div className="container1">
      <h2>Assignment Questions</h2>
      {questions.map((question,index) => (
        <QuestionComp
          key={question.questionId}
          question={question}
          questionNumber={index + 1} // Pass the question number
          handleMCQAnswer={handleMCQAnswer}
          handleEssayAnswer={handleEssayAnswer}
        />
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Answers
      </button>
    </div>
  );
};

export default AssignmentForm;
