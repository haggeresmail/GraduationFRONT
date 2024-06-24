// // //*******************bBANKTest */
// // import React, { useState } from 'react';
// // s
// // import './App.css';



// // const App = () => {
// //   const [questions, setQuestions] = useState([]);

// //   const addQuestion = (question) => {
// //     setQuestions([...questions, question]);
// //   };

// //   const deleteQuestion = (index) => {
// //     setQuestions(questions.filter((_, i) => i !== index));
// //   };

// //   const editQuestion = (index, updatedQuestion) => {
// //     const newQuestions = questions.map((question, i) => 
// //       i === index ? updatedQuestion : question
// //     );
// //     setQuestions(newQuestions);
// //   };

// //   return (
// //     <div>
    
// //       <QuestionForm addQuestion={addQuestion} />
// //       <Quiz questions={questions} deleteQuestion={(index) => deleteQuestion(index)} editQuestion={(index, updatedQuestion) => editQuestion(index, updatedQuestion)} />
// //     </div>
// //   );
// // };

// // export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/TakeQuiz/Home";
import Questions from "./components/TakeQuiz/Questions";
// import "./index.css";
import "./App.css";
// import "./components/TakeQuiz/takequiz.css";
import "./components/TakeQuiz/takequiz.css";
import Result from "./components/TakeQuiz/Result";
import question from "./components/TakeQuiz/question";
import QuestionForm from './components/QuestionForm';

import Quiz from './components/Quiz';
import UploadMaterial from "./components/uploadmaterials/UploadMaterial";
import CourseMaterials from "./components/courseMaterials/CourseMaterials";
import RecordedLecture from './components/courseMaterials/RecordedLecture/RecordedLecture';
import PlayVideoPage from './components/courseMaterials/RecordedLecture/PlayVideoPage';
import RecordedLabs from "./components/courseMaterials/RecordedLabs/RecordedLabs";
import LectureSlides from "./components/courseMaterials/LectureSlides/LectureSlides";
import SlideViewerPage from "./components/courseMaterials/LectureSlides/SlideViewerPage";
import LabSlides from "./components/courseMaterials/LabSlides/LabSlides";




const App = () => {
  const [answer, setAnswer] = useState(Array(question.length).fill(null)); // Initialize with null answers
  const lectureUrl = 'https://www.example.com/lecture.mp4';

  const resetAnswer = () => {
    setAnswer(Array(question.length).fill(null));
  };

  const [questions, setQuestions] = useState([]);

    const addQuestion = (question) => {
      setQuestions([...questions, question]);
    };
  
    const deleteQuestion = (index) => {
      setQuestions(questions.filter((_, i) => i !== index));
    };
  
    const editQuestion = (index, updatedQuestion) => {
      const newQuestions = questions.map((question, i) => 
        i === index ? updatedQuestion : question
      );
      setQuestions(newQuestions);
    };
    const courseId = '123'; // Example courseId, replace with actual logic if needed
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/CourseMaterials" element={<CourseMaterials />} />
         <Route path="/RecordedLecture" element={<RecordedLecture />} />
         <Route path="/RecordedLab" element={<RecordedLabs />} />
         <Route path="/LectureSlides" element={<LectureSlides />} />
         <Route path="/play-video" element={<PlayVideoPage />} />
         <Route path="/view-slides" element={<SlideViewerPage />} />
         <Route path="/LabSlides" element={<LabSlides />} />
         <Route path="/upload" element={<UploadMaterial courseId={courseId} />} />
         
        

        <Route path="/bank" element={ <div>
    
           <QuestionForm addQuestion={addQuestion} />
           <Quiz questions={questions} deleteQuestion={(index) => deleteQuestion(index)} 
           editQuestion={(index, updatedQuestion) => editQuestion(index, updatedQuestion)} />
        </div> } />
        <Route path="/questions" element={<Questions answer={answer} setAnswer={setAnswer} />} />
        <Route path="/solution" element={<Result answer={answer} resetAnswer={resetAnswer} />} />
       
      </Routes>
    </Router>
  );
};


export default App;

