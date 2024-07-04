import React, { useState, useEffect, useCallback } from 'react';
import QuestionComp from './QuestionCompAss'; // Assuming QuestionComp is correctly implemented
import axios from 'axios';
import "./assignmentform.css";
import { useNavigate } from "react-router-dom";

const AssignmentForm = ({ studentId, courseId, assignmentId }) => {
  const [answers, setAnswers] = useState([]); // Store answers for both MCQ and Essay questions
  const [questions, setQuestions] = useState([]); // Initialize questions state as an empty array
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({});

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

  const handleSubmit = useCallback(async () => {
    // Check if any question is not answered
    const unansweredQuestions = answers.some((answer) => !answer.studentAnswer);

    if (unansweredQuestions) {
      // alert('Please answer all questions before submitting.');
      return; // Prevent submission
    }

    navigate("/solution");

    try {
      // Prepare payload and send request
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

      // Log the payload to the console as JSON
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
  }, [navigate, studentId, courseId, assignmentId, selectedOptions, questions, answers]);

  // Fetch questions from backend upon component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://learnhub.runasp.net/api/AssignmentQuestion/GenerateAssignment/20240001/is1`,
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
