import React from "react";
import { Link } from "react-router-dom";
import "./takequiz.css";
const Home = () => {
  return (
    <div className="container welcome_box">
      <div className="row box">
        <p>Welcome to Quiz</p>
        <Link to="/questions">
          <button >Start the Quiz</button>
        </Link>
        <Link to="/CourseMaterials">
          <button >CourseMaterials</button>
        </Link>
        <Link to="/Upload">
          <button >Upload</button>
        </Link>
      </div>
    </div>
  ); 
};
export default Home;