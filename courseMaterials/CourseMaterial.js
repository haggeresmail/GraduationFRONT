// src/components/CourseMaterials.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './CourseMaterial.css'; 
// import { MdSlowMotionVideo } from "react-icons/md";
// import { MdLibraryBooks, MdVideoLibrary } from 'react-icons/md';

// const CourseMaterials = ({ courseId }) => {
//   const navigate = useNavigate();

//   const navigateToMaterial = (materialType) => {
//     // navigate(`/course/${courseId}/${materialType}`);
//     navigate(`/${materialType}`);

//   };

//   return (
//     <div className="course-materials-container">
//       <h2>Course Materials</h2>
//       <div className="buttons-container">
//         <button className="material-button" onClick={() => navigateToMaterial('RecordedLecture')}><MdVideoLibrary />Recorded Lecture</button>
//         <button className="material-button" onClick={() => navigateToMaterial('RecordedLab')}><MdVideoLibrary />Recorded Lab</button>
//         <button className="material-button" onClick={() => navigateToMaterial('LectureSlides')}><MdLibraryBooks />Lecture Slides</button>
//         <button className="material-button" onClick={() => navigateToMaterial('LabSlides')}><MdLibraryBooks />Lab Slides</button>
//       </div>
//     </div>
//   );
// };

// export default CourseMaterials;
