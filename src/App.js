
import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/TakeQuiz/Home";
import Questions from "./components/TakeQuiz/Questions";
// import "./index.css";
import "./App.css";
// import "./components/TakeQuiz/takequiz.css";
// import "./components/TakeQuiz/takequiz.css";
import Result from "./components/TakeQuiz/Result";
// import question from "./components/TakeQuiz/question";
import QuestionForm from './components/QuestionForm';

import Quiz from './components/AddedQuestion';
import UploadMaterial from "./components/uploadmaterials/UploadMaterial";
import CourseMaterials from "./components/courseMaterials/CourseMaterials";
import RecordedLecture from './components/courseMaterials/RecordedLecture/RecordedLecture';
import PlayVideoPage from './components/courseMaterials/RecordedLecture/PlayVideoPage';
import RecordedLabs from "./components/courseMaterials/RecordedLabs/RecordedLabs";
import LectureSlides from "./components/courseMaterials/LectureSlides/LectureSlides";
import SlideViewerPage from "./components/courseMaterials/LectureSlides/SlideViewerPage";
import LabSlides from "./components/courseMaterials/LabSlides/LabSlides";
import AssignmentForm from "./components/takeAssignment/AssignmentForm";
import AnnouncementsPage from "./components/Announcment/AddAnnouncment";
import AnnouncementstudentPage from "./components/Announcment/studentAnnouncment";
import axios from "axios";





const App = () => {
  // const lectureUrl = 'https://www.example.com/lecture.mp4';

  const resetAnswer = () => {
    setAnswer(Array((Array(0).fill(null))));
  };

  // // const [questions, setQuestions] = useState([]);

  //   const addQuestion = (question) => {
  //     setQuestions([...questions, question]);
  //   };
  
  //   const deleteQuestion = (index) => {
  //     setQuestions(questions.filter((_, i) => i !== index));
  //   };
  
  //   const editQuestion = (index, updatedQuestion) => {
  //     const newQuestions = questions.map((question, i) => 
  //       i === index ? updatedQuestion : question
  //     );
  //     setQuestions(newQuestions);
  //   };
  const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState(Array(0).fill(null));
    const courseId = 'is1'; 
    const studentId='20240001';
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(
            `https://learnhub.runasp.net/api/AssignmentQuestion/GenerateAssignment/${studentId}/${courseId}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
          }
  
          // Attempt to parse the JSON response
          const data = response.data;
  
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
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        {/* <Route path="/CourseMaterials" element={<CourseMaterials />} />
         <Route path="/RecordedLecture" element={<RecordedLecture />} />
         <Route path="/RecordedLab" element={<RecordedLabs />} />
         <Route path="/LectureSlides" element={<LectureSlides />} />
         <Route path="/play-video" element={<PlayVideoPage />} />
         <Route path="/view-slides" element={<SlideViewerPage />} />
         <Route path="/LabSlides" element={<LabSlides />} />
         <Route path="/upload" element={<UploadMaterial courseId={courseId} />} /> */}
         
        

        {/* <Route path="/bank" element={ <div> */}
    
           {/* <QuestionForm addQuestion={addQuestion} /> */}
           {/* <Quiz questions={questions} deleteQuestion={(index) => deleteQuestion(index)} 
           editQuestion={(index, updatedQuestion) => editQuestion(index, updatedQuestion)} />
        </div> } /> */}
        <Route path="/questions" element={<Questions answer={answer} setAnswer={setAnswer}  questions={questions}  studentId={studentId} courseId={courseId}/>} />
        <Route path="/solution" element={<Result answer={answer} resetAnswer={resetAnswer} />} />
        <Route path="/takeAssignment" element={<AssignmentForm answer={answer} resetAnswer={resetAnswer} />} />
        <Route path="/addannouncment" element={<AnnouncementsPage  />} />         
        <Route path="/announcment" element={<AnnouncementstudentPage  />} />         
      </Routes>
    </Router>
  );
};


export default App;

