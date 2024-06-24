


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Quiz = ({ questions, deleteQuestion, editQuestion }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [showAnswers, setShowAnswers] = useState(Array(questions.length).fill(false));

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedQuestion(questions[index]);
  };

  const handleSaveClick = (index) => {
    editQuestion(index, editedQuestion);
    setIsEditing(null);
  };

  const handleCancelClick = () => {
    setIsEditing(null);
    setEditedQuestion({});
  };

  const handleChange = (field, value) => {
    setEditedQuestion({
      ...editedQuestion,
      [field]: value,
    });
  };

  const handleDeleteClick = (index) => {
    deleteQuestion(index);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({
      ...editedQuestion,
      options: newOptions,
    });
  };

  const handleCorrectAnswerChange = (value) => {
    setEditedQuestion({
      ...editedQuestion,
      correctAnswer: value,
    });
  };

  const handleDifficultyChange = (value) => {
    setEditedQuestion({
      ...editedQuestion,
      difficulty: value,
    });
  };

  const handleLessonChange = (value) => {
    setEditedQuestion({
      ...editedQuestion,
      lesson: value,
    });
  };

  const handleSubmit = () => {
    const quizData = questions.map((question) => ({
      text: question.text,
      correctAnswer: question.correctAnswer,
      difficulty: question.difficulty,
      lesson: question.lesson,
    }));

    console.log('Submitting quiz data to backend:', quizData);
    // Replace the above console.log with actual API call to send quizData to backend
  };

  const toggleVisibility = (index) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };

  return (
    <div className='con'>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{`${index + 1}) ${question.text}`}</h3>
              <button onClick={() => toggleVisibility(index)}>+</button>
            </div>
            {showAnswers[index] && (
              <>
                {isEditing === index ? (
                  <div>
                    <label>Question:</label>
                    <input
                      type="text"
                      value={editedQuestion.text}
                      onChange={(e) => handleChange('text', e.target.value)}
                    />
                    <label>Topic:</label>
                    <select
                      value={editedQuestion.lesson || ''}
                      onChange={(e) => handleLessonChange(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Lesson</option>
                      <option value="lesson1">Lesson 1</option>
                      <option value="lesson2">Lesson 2</option>
                      <option value="lesson3">Lesson 3</option>
                    </select>
                    {question.type === 'mcq' && (
                      <div>
                        {editedQuestion.options.map((option, i) => (
                          <div key={i}>
                            <label>
                              <input
                                type="radio"
                                value={option}
                                checked={option === editedQuestion.correctAnswer}
                                onChange={() => handleCorrectAnswerChange(option)}
                              />
                              Option {i + 1}:
                            </label>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(i, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <label>Correct Answer:</label>
                    <input
                      type="text"
                      value={editedQuestion.correctAnswer}
                      onChange={(e) => handleChange('correctAnswer', e.target.value)}
                    />
                    <label>Level of Difficulty:</label>
                    <select
                      value={editedQuestion.difficulty}
                      onChange={(e) => handleDifficultyChange(e.target.value)}
                    >
                      <option value="1">Easy</option>
                      <option value="2">Medium</option>
                      <option value="3">Hard</option>
                    </select>
                    <button className="button-spacing" onClick={() => handleSaveClick(index)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    {question.type === 'mcq' && (
                      <ul>
                        {question.options.map((option, i) => (
                          <li key={i}>{option}</li>
                        ))}
                      </ul>
                    )}
                    <p>Correct Answer: {question.correctAnswer}</p>
                    <p>Topic: {question.lesson || 'No lesson selected'}</p>
                    <p>Level of Difficulty: {question.difficulty === '1' ? 'Easy' : question.difficulty === '2' ? 'Medium' : 'Hard'}</p>
                    <button className="button-spacing" onClick={() => handleEditClick(index)}>Edit Question</button>
                    <button className="button-spacing" onClick={() => handleDeleteClick(index)}>Delete Question</button>
                    <button className="button-spacing" onClick={() => toggleVisibility(index)}>Save</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        <button className="button-spacing" onClick={handleSubmit}>Submit </button>
        <Link to="/">
          <button className="btn btn-success px-4 py-2 fw-bold">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Quiz;
