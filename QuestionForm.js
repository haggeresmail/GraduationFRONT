

import React, { useState } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ addQuestion }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('mcq');
  const [difficultyLevel, setDifficultyLevel] = useState('1');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [lesson, setLesson] = useState(''); // State for lesson

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      text: questionText,
      type: questionType,
      difficulty: difficultyLevel,
      options: questionType === 'mcq' ? options : [],
      correctAnswer,
      lesson, // Include lesson in the question object
    };
    addQuestion(question);
    setQuestionText('');
    setQuestionType('mcq');
    setDifficultyLevel('1');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setLesson(''); // Reset lesson
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Level of Difficulty:</label>
        <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
          <option value="1">Easy</option>
          <option value="2">Medium</option>
          <option value="3">Hard</option>
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="mcq">Multiple Choice</option>
          <option value="essay">Essay</option>
        </select>
      </div>
      <div>
        <label>Topic:</label>
        <select value={lesson} onChange={(e) => setLesson(e.target.value)} required>
          <option value="" disabled>Select Lesson</option>
          <option value="lesson1">Lesson 1</option>
          <option value="lesson2">Lesson 2</option>
          <option value="lesson3">Lesson 3</option>
        </select>
      </div>
      {questionType === 'mcq' ? (
        <div>
          {options.map((option, index) => (
            <div key={index}>
              <label>Option {index + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <div>
            <label>Correct Answer:</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            >
              <option value="" disabled>Select correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div>
          <label>Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
      )}
      <button type="submit">Add Question</button>
    </form>
  );
};

export default QuestionForm;
